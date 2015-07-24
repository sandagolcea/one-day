var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function (username, password, done) {
  //TODO: get user from database, see: http://passportjs.org/docs/configure
  if (username === 'admin' && password === 'pass') {
    return done(null, {username: 'admin'});
  }
  return done(null, false);
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  done(null, {username: username});
});

module.exports = passport;
