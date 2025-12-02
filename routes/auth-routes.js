// Importing express
var express = require('express');
// Creating router
var router = express.Router();
// Importing passport
var passport = require('passport');

const { loginUser, createUser } = require('../config/login');


// rendering the login page
router.get('/', (req, res) => {
  res.render('login');
});

//router for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);

  req.login(user, (err) => {
    res.json({ success: true, message: 'Login successful' });
  });
});

//router for signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  await createUser(name, email, password);
  res.json({ success: true, message: 'Account created successfully' });
});

// route for Google OAuth 2.0 authentication
router.get('/google', passport.authenticate('google', {
  scope: ['profile','email'],
  prompt:'select_account'
}));

// callback route after Google authentication
router.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));

// logout route
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(function(err) {
      if(err) { return next(err); }
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

module.exports = router;