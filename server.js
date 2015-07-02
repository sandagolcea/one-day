var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

require('./app/models/professionals.js');
var Professional = mongoose.model('Professional');

app.use('/', express.static(__dirname));

app.get('/create', function(request, response) {
  console.log('hi');
  Professional.create({
   name: 'Sanda'
  }, function() {
    response.send("Hello");
  });
});

app.listen(port, function () {
  console.log('Listening on port '+port+'..');
});
