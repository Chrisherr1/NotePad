router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');  // You'll need to create views/dashboard.ejs
});