var should = require('should');
var supertest = require('supertest');
var app = require('../server');

describe('main page', function () {
  it('should show hello', function (done) {
    done();
  });

  it('should find the homepage', function (done) {
    supertest(app)
    .get('/')
    .expect(200)
    .end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });

});

describe('professionals page', function(){
  it('should respond with json', function(done){
  supertest(app)
    .get('/professionals')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });
});

describe('profile page', function(){
  it('should not be accessible to general public', function(done){
    supertest(app)
      .get('/profile')
      .expect('Content-Type', /json/)
      .expect(302)
      .end(function (err, res) {
        res.status.should.equal(302);
        done();
      });
  });
});
