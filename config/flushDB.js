//database connection
var mongoose = require('mongoose');
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/one-day-test';
mongoose.connect(dbURI);
var db = mongoose.connection;

//deletion mode on
var Professional = require('../app/professional.js');

function deleteAll () {
  Professional.find().remove().exec();
}

deleteAll();