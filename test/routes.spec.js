process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.use(chaiHttp);

describe('GET /api/grudges', function() {
  it('should return all grudges', function(done) {
    chai.request(server)
    .get('/api/grudges')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    done();
    });
  });
});

describe('GET /api/grudges/:id', function() {
  it('should return a specific grudge', function(done) {
    chai.request(server)
    .get('/api/grudges/1')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    done();
    });
  });
});

describe('GET /api/grudges/:id', function() {
  it('should return an error status if id does not match a grudge', function(done) {
    chai.request(server)
    .get('/api/grudges/3')
    .end(function(err, res) {
    res.should.have.status(404);
    done();
    });
  });
});

describe('POST /api/grudge', function() {
  it('should create a new grudge', function(done) {
    let grudge = {
      name: 'Sam',
      deed: 'eating the last eggo',
      date: 'Thu Feb 23 2017 12:21:11 GMT-0700 (MST)',
      status: false
    }
    chai.request(server)
    .post('/api/grudges')
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
    done();
    });
  });
});
