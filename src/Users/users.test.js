const app = require("../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const fs =require('fs');
const { User,Role } = require("../../models");


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
email: "avengersphantom@gmail.com",
permitId:"bmw123",
telNumber:784860836,
carplate:"RAB347XZ",
capacity:80,
vehicletype:"Hyundai",
};

const userMissingFields = {
  name:"Driver test",
  gender:"male",
  idNumber:123456789,
  district:"Nyarugenge",
  sector:"Nyarugenge"
}

const phantomUserCredentials = {
  email: "avengersphantom7@gmail.com",
  password: "phantom123"
}

const invalidLoginCredentials={
  email: "avengersphantom7@gmail.com",
  password: "phantom"
}

const loginMissingFields={
  email: "avengersphantom7@gmail.com",
}

const siginIn = async (userInfo) => {
  const userData = await chai.request(app).post('/api/v1/users/login').send(userInfo);
  return `Bearer ${userData.body.token}`;
}

const createRole = async(roleInfo)=>{
  const token = await siginIn(phantomUserCredentials);
  const roleData = await chai.request(app).post("/api/v1/roles").set('Authorization', token).send(roleInfo);
  return roleData.body.data.role.uuid;
}

const phantomOperator={
  email:"avengersphantom70@gmail.com",
  password:"operator123"
}
describe('users API testing', () => {
  let uuid,Token

  beforeEach(async () => {
    await Role.destroy({
      where: {},
      truncate: true
    });
  });

it('it should display the welcome message', async () => {
  const res = await chai.request(app).get('/');
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property(
    'message',
    'Welcome to Phantom Project Powered By Avengers!!'
  );
});

it(' only Admin should register a user', async() => {
  const token = await siginIn(phantomUserCredentials);
  const roleId = await createRole({roleName:"operator"});
  const res = await chai.request(app).post(`/api/v1/users/register/${roleId}`).set('Authorization', token).send(phantomUser);
  expect(res.status).to.be.equal(201);
  expect(res.body).to.be.property('status', `success`)
  expect(res.body).to.have.property('message', `Email Sent successfully 👍🏾`);
  expect(res.body).to.be.a('object'); 

  uuid = res.body.data.user.uuid
});


it('should not register a user if you are not admin', async() => {
  const token = await siginIn(phantomOperator);
  const roleId = await createRole({roleName:"administrator"});
  const res = await chai.request(app).post(`/api/v1/users/register/${roleId}`).set('Authorization', token).send(phantomUser);
  expect(res.status).to.be.equal(403);
  expect(res.body).to.have.property('message', `You are not permitted to perform this action`);
  expect(res.body).to.be.a('object'); 
});


it('Can not create a user twice', async() => {
  const token = await siginIn(phantomUserCredentials);
  const roleId = await createRole({roleName:"administrator"});
  const res = await chai.request(app).post(`/api/v1/users/register/${roleId}`).set('Authorization', token).send(phantomUser);
  expect(res.status).to.be.equal(403);
  expect(res.body).to.have.property('message', `User Already Exist Please use a different account`)
  expect(res.body).to.be.a('object');
})


it('Can not Register a user with missing fields', async() => {
  const token = await siginIn(phantomUserCredentials);
  const roleId = await createRole({roleName:"administrator"});
  const res = await chai.request(app).post(`/api/v1/users/register/${roleId}`).set('Authorization', token).send(userMissingFields);
  expect(res.status).to.be.equal(500);
  expect(res.body).to.be.property('status', `fail`)
  expect(res.body).to.have.property('message', `try aaagain message`);
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


it('User should login', async() => {
  const email = phantomUserCredentials.email;
  const user = await User.findOne({ where: { email }});
  const res = await chai.request(app).post('/api/v1/users/login').send(phantomUserCredentials);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', `${user.name} successfully Logged in!!`);
});

it('should get all users information as an admin', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).get(`/api/v1/users`).set('Authorization', token)
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('status', 'success');
});


it('should get a single user information', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).get(`/api/v1/users/${uuid}`).set('Authorization', token)
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('status', 'success message');
});

it('should not get a single user information for invalid id', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).get(`/api/v1/users/7d69b92d`).set('Authorization', token)
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'No user with that ID');
});

it('should update a user information', async() => { 
  const updateUser ={
    name:"Phantom phantom",
    gender:"Female",
    idNumber:123456789,
    district:"Muhanga",
    sector:"Nyamabuye",
    cell:"Gahogo",
    email: "avengersphantom@gmail.com",
    permitId:"bmw123",
    telNumber:784860836,
    carplate:"RAB347XZ",
    capacity:100,
    vehicletype:"Coaster",
  }
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/${uuid}`).set('Authorization', token).send(updateUser);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', 'User Updated Successully');
});

it('should not update a user information for invalid ID', async() => { 
  const updateUser ={
    name:"Phantom phantom",
    gender:"Female",
    idNumber:123456789,
    district:"Muhanga",
    sector:"Nyamabuye",
    cell:"Gahogo",
    email: "avengersphantom@gmail.com",
    permitId:"bmw123",
    telNumber:784860836,
    carplate:"RAB347XZ",
    capacity:100,
    vehicletype:"Coaster",
  }
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/7d69b92d`).set('Authorization', token).send(updateUser);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'No user with that ID');
});

it('should not change a user role if role does not exists', async() => { 
  const updateRole ={
    roleName:"operator"
  }
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/${uuid}/changerole`).set('Authorization', token).send(updateRole);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'Role does not exists');
});

it('should not change a user role if user already has that role', async() => { 
  const updateRole ={
    roleName:"operator"
  }
  await createRole({roleName:"operator"});
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/8e3d2a6c-5484-4d86-8eb0-40098cd7a530/changerole`).set('Authorization', token).send(updateRole);
  expect(res.status).to.be.equal(403);
  expect(res.body).to.have.property('message', `The user is already an ${updateRole.roleName}`);
});

let notificationId;

it('should change a user role', async() => { 
  const updateRole ={
    roleName:"administrator"
  }
  await createRole({roleName:"administrator"});
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/8e3d2a6c-5484-4d86-8eb0-40098cd7a530/changerole`).set('Authorization', token).send(updateRole);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', "User's role Updated Successfully");
  notificationId = res.body.data.notification.uuid
});

it('should get all users notifications', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).get(`/api/v1/users/notifications`).set('Authorization', token)
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('status', 'success');
});

it('should read notification', async() => { 
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).get(`/api/v1/users/notifications/${notificationId}`).set('Authorization', token)
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('status', 'success');
});

it('should not read notification for invalid ID', async() => { 
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).get(`/api/v1/users/notifications/2f6b34f2-`).set('Authorization', token)
  expect(res.status).to.be.equal(500);
  expect(res.body).to.have.property('message', 'Something went wrong try Again!!');
});

it('should delete notification', async() => { 
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).delete(`/api/v1/users/notifications/${notificationId}`).set('Authorization', token)
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('status', 'success');
});

it('should not delete notification for invalid ID', async() => { 
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).delete(`/api/v1/users/notifications/2f6b34f2-`).set('Authorization', token)
  expect(res.status).to.be.equal(500);
  expect(res.body).to.have.property('message', 'Something went wrong try Again!!');
});

it('should get not read non existing notification ', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).get(`/api/v1/users/notifications/${notificationId}`).set('Authorization', token)
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'Notification not found');
});

it('should not delete non-existing notification', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).delete(`/api/v1/users/notifications/${notificationId}`).set('Authorization', token)
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'Notification not found');
});


it('should not update user profile if no image file provided', async() => { 
  const updateUser ={
    name:"Phantom phantom",
    gender:"Female",
    idNumber:123456789,
    district:"Muhanga",
    sector:"Nyamabuye",
    cell:"Gahogo",
    email: "avengersphantom@gmail.com",
    permitId:"bmw123",
    telNumber:784860836,
    carplate:"RAB347XZ",
    capacity:100,
    vehicletype:"Coaster",
  }
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/updateProfile/${uuid}`).set('Authorization', token).send(updateUser);
  expect(res.status).to.be.equal(403);
  expect(res.body).to.have.property('message', 'upload a file');
});

it('user should update profile', async() => { 
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app)
  .patch(`/api/v1/users/updateProfile/${uuid}`)
  .set('content-type', 'multipart/form-data')
  .set('Authorization', token)
  .attach('user_image', fs.readFileSync(`${__dirname}/ball.jpg`), 'tests/ball.jpg')


  expect(res.status).to.be.equal(201);
  expect(res.body).to.have.property('message', 'User Updated');
});

it('should not update user profile if ID is invalid', async() => { 
  const updateUser ={
    name:"Phantom phantom",
    gender:"Female",
    idNumber:123456789,
    district:"Muhanga",
    sector:"Nyamabuye",
    cell:"Gahogo",
    email: "avengersphantom@gmail.com",
    permitId:"bmw123",
    telNumber:784860836,
    carplate:"RAB347XZ",
    capacity:100,
    vehicletype:"Coaster",
  }
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/updateProfile/7d69b92d`).set('Authorization', token).send(updateUser);
  expect(res.status).to.be.equal(500);
  expect(res.body).to.have.property('message', 'There was an error while updating');
});



it('should not update user profile if ID does not exists', async() => { 
  const updateUser ={
    name:"Phantom phantom",
    gender:"Female",
    idNumber:123456789,
    district:"Muhanga",
    sector:"Nyamabuye",
    cell:"Gahogo",
    email: "avengersphantom7@gmail.com",
    permitId:"bmw123",
    telNumber:784860836,
    carplate:"RAB347XZ",
    capacity:100,
    vehicletype:"Coaster",
  }
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).patch(`/api/v1/users/updateProfile/7d69b92de121457da4e9621e9593f88e`).set('Authorization', token).send(updateUser);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'User Not Found');
});


it('should send Password reset link', async() => {
  let email ={
    email:"avengersphantom@gmail.com"
  }
  const res = await chai.request(app).put(`/api/v1/users/forgotpassword`).send(email);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.property('status', `sucess`)
  expect(res.body).to.have.property('message', `Token sent to email`);
  expect(res.body).to.be.a('object'); 
  Token = res.body.token
});




it('should not send Password reset link if there is internal server error', async() => {
  let email ={
  }
  const res = await chai.request(app).put(`/api/v1/users/forgotpassword`).send(email);
  expect(res.status).to.be.equal(500);
  expect(res.body).to.have.property('message', `Error while sending the email please try again after some times`);
});

it('should not send Password reset link if no user with that email', async() => {
  let email ={
    email:"avengersphantom12@gmail.com"
  }
  const res = await chai.request(app).put(`/api/v1/users/forgotpassword`).send(email);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', `There is no user with that email address`); 
});

it('should reset Password', async() => {
  let resetPassword ={
    password:"avengers"
  }
  const res = await chai.request(app).put(`/api/v1/users/resetpassword/${Token}`).send(resetPassword);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.be.property('status', `success`)
  expect(res.body).to.have.property('message', `Your password has been updated successfully 👍🏾`);
  expect(res.body).to.be.a('object'); 
});


it('should not reset Password if no password or token provided', async() => {
  let resetPassword ={

  }
  const res = await chai.request(app).put(`/api/v1/users/resetpassword/${Token}`).send(resetPassword);
  expect(res.status).to.be.equal(401);
  expect(res.body).to.have.property('message', `Please check whether Password or Token are provided`);
  expect(res.body).to.be.a('object'); 
});

it('should not reset Password if token is invalid ', async() => {
  let resetPassword ={
    password:"avengers"
  }
  const res = await chai.request(app).put(`/api/v1/users/resetpassword/aaaaawwe231`).send(resetPassword);
  expect(res.status).to.be.equal(401);
  expect(res.body).to.have.property('message', `The User belongs to this token does'nt exist`);
  expect(res.body).to.be.a('object'); 
});

it('should not change user password if old password is Incorrect', async() => {
  let changePassword ={
    oldpassword:"operator12", 
    newpassword1:"NYDT", 
    newpassword2:"Nyabugogo"
  }
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).patch(`/api/v1/users/changepassword`).set('Authorization', token).send(changePassword);
  expect(res.status).to.be.equal(401);
  expect(res.body).to.have.property('message', `The old password is wrong, correct it and try again`);
  expect(res.body).to.be.a('object'); 
});

it('should not change user password if passwords do not match ', async() => {
  let changePassword ={
    oldpassword:"operator123", 
    newpassword1:"operator", 
    newpassword2:"driver"
  }
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).patch(`/api/v1/users/changepassword`).set('Authorization', token).send(changePassword);
  expect(res.status).to.be.equal(401);
  expect(res.body).to.have.property('message', `new password does not match`);
  expect(res.body).to.be.a('object'); 
});

it('should not change user password if no token provided', async() => {
  let changePassword ={
    oldpassword:"operator123", 
    newpassword1:"operator", 
    newpassword2:"operator"
  }
  const res = await chai.request(app).patch(`/api/v1/users/changepassword`).set('Authorization', 'Bearer ').send(changePassword);
  expect(res.status).to.be.equal(401);
  expect(res.body).to.have.property('message', `You are not logged in Please login to have access`);
  expect(res.body).to.be.a('object'); 
});

it('should change user password', async() => {
  let changePassword ={
    oldpassword:"operator123", 
    newpassword1:"operator", 
    newpassword2:"operator"
  }
  const token = await siginIn(phantomOperator);
  const res = await chai.request(app).patch(`/api/v1/users/changepassword`).set('Authorization', token).send(changePassword);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', `your password is updated successfully`);
  expect(res.body).to.be.a('object'); 
});

it('should not delete a user for invalid ID', async() => {  
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).delete(`/api/v1/users/7d69b92d`).set('Authorization', token);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'No user with that ID');
});

it('should delete a user test', async() => {  
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).delete(`/api/v1/users/${uuid}`).set('Authorization', token);
  expect(res.status).to.be.equal(200);
  expect(res.body).to.have.property('message', 'User Deleted Successully');
});

it('should not delete a user if user does not exists', async() => {  
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).delete(`/api/v1/users/${uuid}`).set('Authorization', token);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'No user with that ID');
});

it('should not change a user role if user does not exists', async() => { 
  const updateRole ={
    roleName:"administrator"
  }
  const token = await siginIn(phantomUserCredentials);
  await createRole({roleName:"administrator"});
  const res = await chai.request(app).patch(`/api/v1/users/${uuid}/changerole`).set('Authorization', token).send(updateRole);
  expect(res.status).to.be.equal(404);
  expect(res.body).to.have.property('message', 'No user with that ID');
});

it('Can not Register a user if role does not exist', async() => {
  const token = await siginIn(phantomUserCredentials);
  const res = await chai.request(app).post(`/api/v1/users/register/94f3de208a3342a7-b486-3985585b883c`).set('Authorization', token).send(phantomUser);
  expect(res.status).to.be.equal(403);
  expect(res.body).to.have.property('message', `Role does not exist`);
});

});
