var mongoose = require('mongoose');
var Professional = require('../app/professional.js');
var professionals = require('./professionals.json');
var bcrypt = require('bcrypt-nodejs');
mongoose.connect('mongodb://localhost/one-day-test');

function seedProfessionals(professionals) {

  professionals.forEach( function (professional) {
    Professional.create({
     name: professional.name,
     job: professional.job,
     local : {
        email: professional.email,
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(8), null)
     }
    });
  });
}

seedProfessionals(professionals);
