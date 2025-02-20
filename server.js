const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Session Middleware
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Setup
passport.use(new GoogleStrategy({
    clientID: '101805323559-k8o2cknkvojchib274erckpjmkogerij.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Routes
app.get('/', (req, res) => res.send('<h2>Welcome! <a href="/auth/google">Login with Google</a></h2>'));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`<h1>Hello, ${req.user.displayName}!</h1><p>Email: ${req.user.emails[0].value}</p> <a href="/logout">Logout</a>`);
});

app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

// Start Server
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
