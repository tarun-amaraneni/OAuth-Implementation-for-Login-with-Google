const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Session Middleware
// Used to maintain user sessions across requests
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Setup
passport.use(new GoogleStrategy({
    clientID: '101805323559-k8o2cknkvojchib274erckpjmkogerij.apps.googleusercontent.com', // Google OAuth client ID
    clientSecret: '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', // Google OAuth client secret
    callbackURL: 'http://localhost:3000/auth/google/callback' // Redirect URL after authentication
  },
  (accessToken, refreshToken, profile, done) => {
    // User authentication successful, return user profile
    return done(null, profile);
  }
));

// Serialize user to session
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from session
passport.deserializeUser((user, done) => done(null, user));

// Routes

// Home route with login link
app.get('/', (req, res) => res.send('<h2>Welcome! <a href="/auth/google">Login with Google</a></h2>'));

// Route to start Google OAuth authentication
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), // If authentication fails, redirect to home
  (req, res) => {
    res.redirect('/profile'); // Redirect to profile page after successful authentication
  }
);

// Profile route - displays user details if authenticated
app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/'); // Redirect to home if not authenticated
  res.send(`<h1>Hello, ${req.user.displayName}!</h1><p>Email: ${req.user.emails[0].value}</p> <a href="/logout">Logout</a>`);
});

// Logout route - logs user out and redirects to home
app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/')); // Ends user session and redirects to home
});

// Start Server on port 3000
app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
