var mongoose = require('mongoose');
var Professional = require('../app/professional.js');

describe('Professionals model', function() {

  beforeEach( function (done) {
    Professional.register('test@test.com', 'password', function (newProfessional) {
      done();
    });
  });

  after( function (done) {
    Professional.remove({}, function () {
      done();
    });
  });

  it('- can register a new professional', function(done){
    Professional.register('test2@test.com', 'password', function (newProfessional) {
      newProfessional.name.should.eql('test2@test.com');
      done();
    });
  });

  it('- can fetch professionals by email', function(done){
    Professional.findByEmail('test@test.com', function (foundProfessional) {
      foundProfessional.name.should.eql('test@test.com');
      done();
    });
  });
});
