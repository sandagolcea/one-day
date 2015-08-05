module.exports = function (app, passport) {
  app.get('/login', function (request, response) {
    response.render('login', {title: 'login'});
  });

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile'
  }));

  app.get('/profile', isLoggedIn, function (request, response) {
    response.render('profile.ejs', {user : request.user});
  });

  app.get('/logout', function (request, response) {
    request.logout();
    response.redirect('/');
  });
};

function isLoggedIn (request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
}
