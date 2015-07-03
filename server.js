var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

require('./app/models/professionals.js');
var Professional = mongoose.model('Professional');

app.use('/', express.static(__dirname));
app.use(bodyParser.json());

app.get('/professionals', function(request, response) {
  Professional
    .find()
    .exec(function(err, professionals) {
      if (err) {
       return handleError(err);
     }
    response.json(professionals);
  });
});

// TODO: profile addition for new professionals
app.get('/create', function(request, response) {
  console.log('hi');
  Professional.create({
   name: 'Sanda',
   email: 'sanda.golcea@gmail.com',
   job: 'software developer'
  }, function() {
    response.send("Hello");
  });
});

app.listen(port, function () {
  console.log('Listening on port '+port+'..');
});
