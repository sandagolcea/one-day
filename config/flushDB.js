require('../app/models/professionals.js');

var mongoose = require('mongoose');

var Professional = mongoose.model('Professional');

function deleteAll () {
  Professional.find().remove().exec();
}

deleteAll();