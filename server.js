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
