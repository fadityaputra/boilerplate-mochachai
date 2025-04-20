// Import the app from server.js
const app = require('../server'); // Correct the path to 'server.js'

// Import testing libraries
const chai = require('chai');
const chaiHttp = require('chai-http');

// Setup chai-http
chai.use(chaiHttp);
const should = chai.should();

// Example test for a GET request
describe('Functional Tests', function() {
  it('should return "hello" when accessing /hello', function(done) {
    chai.request(app) // Use the app instance from server.js
      .get('/hello')
      .end(function(err, res) {
        res.should.have.status(200);
        res.text.should.equal('hello Guest'); // Default name if no query parameter is passed
        done();
      });
  });

  it('should return traveller info when surname is Polo', function(done) {
    chai.request(app)
      .put('/travellers')
      .send({ surname: 'Polo' })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.have.property('name').eql('Marco');
        res.body.should.have.property('surname').eql('Polo');
        res.body.should.have.property('dates').eql('1254 - 1324');
        done();
      });
  });

  it('should return traveller info when surname is Colombo', function(done) {
    chai.request(app)
      .put('/travellers')
      .send({ surname: 'Colombo' })
      .end(function(err, res) {
        res.should.have.status(200);
        res.body.should.have.property('name').eql('Cristoforo');
        res.body.should.have.property('surname').eql('Colombo');
        res.body.should.have.property('dates').eql('1451 - 1506');
        done();
      });
  });

  // Add other functional tests as needed...
});
