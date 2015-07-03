require('../app/models/professionals.js');
var mongoose = require('mongoose');

var Professional = mongoose.model('Professional');
var professionals = require('./professionals.json');

function seedProfessionals(professionals) {
  professionals.forEach( function (professional) {
    Professional.create({
     name: professional.name,
     email: professional.email,
     job: professional.job
    });
  });
}

seedProfessionals(professionals);
