var mongoose = require('mongoose');
var Professional = require('../app/professional.js');

describe('Professionals model', function() {

  before( function (done) {
    Professional.register('test@test.com', 'password', function (newProfessional) {
      done();
    });
  });

  after(function(done) {
    mongoose.connection.close( function () {
      console.log('Database connection closed..');
    });
    done();
  });

  it('- can register a new professional', function(done){
    Professional.register('test2@test.com', 'password', function (newProfessional) {
      newProfessional.name.should.eql('test2@test.com');
      done();
    });
  });

  it('- can fetch existing professionals by email', function(done){
    Professional.findByEmail('test@test.com', function (foundProfessional) {
      foundProfessional.name.should.eql('test@test.com');
      done();
    });
  });
});
