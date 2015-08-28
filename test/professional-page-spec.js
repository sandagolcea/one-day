var should = require('should');
var supertest = require('supertest');
var app = require('../server');

var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/one-day-test';

before( function (done) {
  Professional.remove({}, function () {
    done();
  });
});

describe('Professionals', function(){

  it('should be listed in a json page', function(done){
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

  it('should be able to sign up', function(done) {
  supertest(app)
    .post('/signup')
    .send({email: 'bob@gmail.com', password: 'pass'})
    .expect(302)
    .end(checkUserInList);

    function checkUserInList (err, res) {
      if (err) done(err);
      res.status.should.equal(302);

      supertest(app)
        .get('/professionals')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          res.status.should.equal(200);
          res.body[0].should.have.property('name','bob@gmail.com');
          done();
        });
    };
  });

  it('should be in the user list if they have signed up', function (done) {
  supertest(app)
    .get('/professionals')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      res.status.should.equal(200);
      res.body[0].should.have.property('name','bob@gmail.com');
      done();
    });
  });

  it('should be redirected to profile page on signup', function(done){
    supertest(app)
      .post('/signup')
      .send({email: 'sanda@gmail.com', password: 'password'})
      .end(function (err, res) {
        res.status.should.equal(302);
        res.headers.should.have.property('location','/profile');
        done();
      });
  });

  it('not be able to access profile page if not signed in', function(done){
    supertest(app)
      .get('/profile')
      .expect(302)
      .end(function (err, res) {
        res.status.should.equal(302);
        res.headers.should.have.property('location','/login');
        done();
      });
  });

  //TODO: fix test (currently not passing)
  xit('should be redirected to profile page on login', function(done){
    supertest(app)
      .post('/login')
      .send({email: 'sanda@gmail.com', password: 'password'})
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err)
        res.status.should.equal(302);
        res.headers.should.have.property('location','/profile');
        done();
      });
  });

  it('should not be able to log in using a wrong pass');
});
