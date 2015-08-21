var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var Professional = require('./professional.js');

// Local Authentication Strategy
passport.use(new LocalStrategy(function (username, password, done) {
  Professional.findOne({ 'local.email' :  username }, function(err, user) {
    if (err) {
        return done(err);
    }

    if (!user || !user.validPassword(password)) {
        return done(null, false, null);      
    }

    return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Professional.findById(id, function(err, user) {
      done(err, user);
  });
});

//Local Signup Strategy
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
}, function(req, email, password, done) {
  process.nextTick (function () {
    Professional.findOne({'local.email': email}, function (err, user) {
      if (err)
        return done(err);
      if (user) {
        return done(null, false, null);
      } else {
        var newProfessional = new Professional();
        newProfessional.name = email;
        newProfessional.local.email = email;
        newProfessional.local.password = newProfessional.generateHash(password);
        newProfessional.save( function (err) {
          if (err)
            throw err;
          return done(null, newProfessional);
        });
      }
    });
  });
}));

module.exports = passport;
