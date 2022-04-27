const app = require('../../../app.js');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe('API testing', () => {
  it('it should display the welcome message', async () => {
    const res = await chai.request(app).get('/');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Welcome to Phantom Project Powered By Avengers!!'
    );
  });
});
