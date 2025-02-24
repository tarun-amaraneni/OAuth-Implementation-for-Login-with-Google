require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Session Middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// **Simple Login Page**
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Login</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 20%; background-color: #f5f5f5; }
          .container { background: white; padding: 30px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); display: inline-block; border-radius: 10px; }
          h1 { color: #333; }
          .login-btn {
            background-color: #4285F4;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            display: inline-block;
            margin-top: 15px;
          }
          .login-btn:hover { background-color: #357ae8; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome</h1>
          <a class="login-btn" href="/auth/google">Login with Google</a>
        </div>
      </body>
    </html>
  `);
});

// Google OAuth Authentication Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => res.redirect('/profile')
);

// Profile Route
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`
    <html>
      <head>
        <title>Profile</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 10%; background-color: #f5f5f5; }
          .container { background: white; padding: 40px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); display: inline-block; border-radius: 10px; }
          h1 { color: #333; }
          .logout-btn {
            background-color: #ff3b30;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            display: inline-block;
            margin-top: 10px;
          }
          .logout-btn:hover { background-color: #e62e26; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello, ${req.user.displayName}!</h1>
          <p>Email: ${req.user.emails[0].value}</p>
          <a class="logout-btn" href="/logout">Logout</a>
        </div>
      </body>
    </html>
  `);
});

// Logout Route
app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

// Start Server
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
