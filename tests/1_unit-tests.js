// Import the app from server.js
const app = require('../server'); // Correct the path to 'server.js'

// Import testing libraries
const chai = require('chai');
const chaiHttp = require('chai-http');

// Setup chai-http
chai.use(chaiHttp);
const should = chai.should();

// Unit Test: Check if the server is running and responds to the /hello endpoint
describe('Unit Tests', function() {
  // Test for GET request to /hello
  it('should return "hello" when accessing /hello', function(done) {
    chai.request(app) // Use the app instance from server.js
      .get('/hello')  // Send a GET request to /hello
      .end(function(err, res) { // Handle the response
        res.should.have.status(200); // Check if the response status is 200
        res.text.should.equal('hello Guest'); // Default response should be 'hello Guest'
        done(); // Indicate that the test is complete
      });
  });

  // Test for GET request to /hello with a query parameter
  it('should return "hello" followed by the name from the query parameter', function(done) {
    chai.request(app) // Use the app instance from server.js
      .get('/hello?name=John')  // Send a GET request with a query parameter
      .end(function(err, res) { // Handle the response
        res.should.have.status(200); // Check if the response status is 200
        res.text.should.equal('hello John'); // The response should match 'hello John'
        done(); // Indicate that the test is complete
      });
  });

  // Test for PUT request to /travellers with a surname of 'Polo'
  it('should return Marco Polo information for surname Polo', function(done) {
    chai.request(app) // Use the app instance from server.js
      .put('/travellers')  // Send a PUT request to /travellers
      .send({ surname: 'Polo' })  // Send the request body with surname: Polo
      .end(function(err, res) { // Handle the response
        res.should.have.status(200); // Check if the response status is 200
        res.body.should.have.property('name').eql('Marco');  // Check if the name is Marco
        res.body.should.have.property('surname').eql('Polo'); // Check if the surname is Polo
        res.body.should.have.property('dates').eql('1254 - 1324'); // Check if the dates match
        done(); // Indicate that the test is complete
      });
  });

  // Test for PUT request to /travellers with a surname of 'Colombo'
  it('should return Cristoforo Colombo information for surname Colombo', function(done) {
    chai.request(app) // Use the app instance from server.js
      .put('/travellers')  // Send a PUT request to /travellers
      .send({ surname: 'Colombo' })  // Send the request body with surname: Colombo
      .end(function(err, res) { // Handle the response
        res.should.have.status(200); // Check if the response status is 200
        res.body.should.have.property('name').eql('Cristoforo');  // Check if the name is Cristoforo
        res.body.should.have.property('surname').eql('Colombo'); // Check if the surname is Colombo
        res.body.should.have.property('dates').eql('1451 - 1506'); // Check if the dates match
        done(); // Indicate that the test is complete
      });
  });

  // Test for PUT request to /travellers with a surname of 'Vespucci'
  it('should return Amerigo Vespucci information for surname Vespucci', function(done) {
    chai.request(app) // Use the app instance from server.js
      .put('/travellers')  // Send a PUT request to /travellers
      .send({ surname: 'Vespucci' })  // Send the request body with surname: Vespucci
      .end(function(err, res) { // Handle the response
        res.should.have.status(200); // Check if the response status is 200
        res.body.should.have.property('name').eql('Amerigo');  // Check if the name is Amerigo
        res.body.should.have.property('surname').eql('Vespucci'); // Check if the surname is Vespucci
        res.body.should.have.property('dates').eql('1454 - 1512'); // Check if the dates match
        done(); // Indicate that the test is complete
      });
  });

  // Test for PUT request to /travellers with an unknown surname
  it('should return unknown for an unknown surname', function(done) {
    chai.request(app) // Use the app instance from server.js
      .put('/travellers')  // Send a PUT request to /travellers
      .send({ surname: 'Smith' })  // Send the request body with a non-existent surname
      .end(function(err, res) { // Handle the response
        res.should.have.status(200); // Check if the response status is 200
        res.body.should.have.property('name').eql('unknown');  // The name should be unknown for an unknown surname
        done(); // Indicate that the test is complete
      });
  });
});
