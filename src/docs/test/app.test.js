const app = require("../../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { User } = require("./../../../models");

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

const phantomUser = {
name:"Phantom operator",
gender:"male",
idNumber:123456789,
district:"Nyarugenge",
sector:"Nyarugenge",
cell:"Nyarugenge",
email: process.env.REGISTER_EMAIL,
permitId:"bmw123",
telNumber:784860836,
carplate:"RAB347XZ",
capacity:80,
vehicletype:"Hyundai",
role:"operator"
};

const userMissingFields = {
  name:"Driver test",
  gender:"male",
  idNumber:123456789,
  district:"Nyarugenge",
  sector:"Nyarugenge"
}

const phantomUserCredentials = {
  email: process.env.LOGIN_EMAIL,
  password: process.env.LOGIN_PASSWORD
}

const invalidLoginCredentials={
  email: process.env.REGISTER_EMAIL,
  password: "WyEHeg3"
}

const loginMissingFields={
  email: process.env.REGISTER_EMAIL,
}

const siginIn = async (userInfo) => {
  const userData = await chai.request(app).post('/api/v1/users/login').send(userInfo);
  return `Bearer ${userData.body.token}`;
}

describe('API testing', () => {
  it('it should display the welcome message', async () => {
    const res = await chai.request(app).get('/');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Welcome to Phantom Project Powered By Avengers!!'
    );
  });

  it('Register a user Successfully', async() => {
    const res = await chai.request(app).post('/api/v1/users/register').send(phantomUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.property('status', `success`)
    expect(res.body).to.have.property('message', `Email Sent successfully 👍🏾`);
    expect(res.body).to.be.a('object'); 
});

it('Can not create a user twice', async() => {
  const res = await chai.request(app).post('/api/v1/users/register').send(phantomUser);
  expect(res.status).to.be.equal(403);
  expect(res.body).to.have.property('message', `User Already Exist Please use a different account`)
  expect(res.body).to.be.a('object');
})

it('Can not Register a user with missing fields', async() => {
  const res = await chai.request(app).post('/api/v1/users/register').send(userMissingFields);
  expect(res.status).to.be.equal(500);
  expect(res.body).to.be.property('status', `fail`)
  expect(res.body).to.have.property('message', `Something went wrong try Again!!`);
  expect(res.body).to.be.a('object'); 
});

it('User login fail because of invalid email or password', async() => {
  const res = await chai.request(app).post('/api/v1/users/login').send(invalidLoginCredentials);
  expect(res.status).to.be.equal(401);
  expect(res.body).to.have.property('message', `Invalid Email or Password`);
  expect(res.body).to.be.a('object');
});

it('User login fail because of missing fields', async() => {
  const res = await chai.request(app).post('/api/v1/users/login').send(loginMissingFields);
  expect(res.status).to.be.equal(400);
  expect(res.body).to.have.property('message', `Please Provide email and password`);
  expect(res.body).to.be.a('object');
 
});

it('User login success', async() => {
  const email = phantomUserCredentials.email;
  const user = await User.findOne({ where: { email }});
  console.log(user.name);
  const res = await chai.request(app).post('/api/v1/users/login').send(phantomUserCredentials);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', `${user.name} successfully Logged in!!`);
});

it('delete a user test', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const email = process.env.REGISTER_EMAIL
  const user = await User.findOne({ where: { email }});
  const uuid = user.uuid; 
  const res = await chai.request(app).delete(`/api/v1/users/${uuid}`).set('Authorization', token);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', 'User Deleted Successfully');
});

});
