var express = require('express');
var app = express();
var passport = require('./app/auth.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

require('./app/models.js');
var Professional = mongoose.model('Professional');

app.set('view engine','ejs');
app.use('/', express.static(__dirname));

app.use(cookieParser());
app.use(session({
  secret: 'salt',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//user login/logout routes
require('./app/routes.js')(app, passport);

app.get('/professionals', function (request, response) {
  Professional
    .find()
    .exec(function(err, professionals) {
      if (err) {
       return handleError(err);
     }
    response.json(professionals);
  });
});

app.post('/professionals', function (request, response, next) {
  var professional = new Professional({
    name: request.body.name,
    email: request.body.email,
    job: request.body.job
  });
  professional.save(function (err, professional) {
    if (err) { 
      return next(err) 
    }
    // response.status(201).json(professional);
    response.redirect('back');
  });
});

app.listen(port, function () {
  console.log('Listening on port '+port+'..');
});

//close database connection on exit:
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose db connection closed.'); 
    process.exit(0); 
  }); 
});
