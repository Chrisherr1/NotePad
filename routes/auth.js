var express = require('express');
var passport = require('passport');

var router = express.Router();

// rendering the login page
router.get('/', function(req, res, next) {
  res.render('login');
});

// route for Google OAuth 2.0 authentication
router.get('/login/federated/google', passport.authenticate('google'));

// callback route after Google authentication
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

// dashboard route
router.get('/dashboard', function(req, res, next) {
  res.send('Welcome to the dashboard!');
});

module.exports = router;