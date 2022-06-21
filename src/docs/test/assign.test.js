const app = require("../../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

// import fs from 'fs'
// import mongoose from 'mongoose'assign/2290cccd-d5ef-4be8-81d3-0c63d9df4c22/54535156-f6ee-4454-9b58-4f33d9f79cab;

const signToken = (uuid) => {
    return jwt.sign({ uuid }, process.env.JWT_SECRETE, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
const token = signToken('9e3d2a6c-5484-4d86-8eb0-f0098cd7a540');
console.log(token)


before(function(done){
    this.timeout(20000);
    chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-a0098cd7a540/2ae55c54-1a1a-4eed-8f8e-a6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("message")
             done();
            });

    
    // });
})
describe('Assign', function(){
   
    it('should get all assigned  drivers to buss', function(done){
        this.timeout(100000);
        chai.request(app)
            .get('/api/v1/assignment/buses')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("result")
            done();
            });

    })
    it('should get all assigned  drivers to buss', function(done){
        this.timeout(100000);
        chai.request(app)
            .get('/api/v1/assignment/drivers')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(200);
                // chai.expect(res.body).be.a('object');
                // chai.expect(res.body).to.have.deep.property("result")
            done();
            });

    })
    it('should assigned  drivers to buss', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-b0098cd7a540/2ae55c54-1a1a-4eed-8f8e-b6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("message")
            done();
            });

    })
    it('should un assigned  drivers to buss', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-a0098cd7a540/2ae55c54-1a1a-4eed-8f8e-a6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("message")
            done();
            });

    })
    it('should return no bs with that id', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-c0098cd7a540/2ae55c54-1a1a-4eed-8f8e-bff1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(404);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return  bus allready assigned', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-c0098cd7a540/2ae55c54-1a1a-4eed-8f8e-e6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return  no user with that id', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-dff98cd7a540/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(500);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return  no user with that id un assign', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9f3d2a6c-5484-4d86-8eb0-dff98cd7a540/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(404);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return   user he is not a driver', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-40098cd7a540/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return   user he is not a assigned', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-c0098cd7a540/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return   no bus with that id un assign', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-d0098cd7a540/2ae55c54-1a1a-4eed-8f8e-c6bba62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(404);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return   bus is is not assigned un assign', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-d0098cd7a540/2ae55c54-1a1a-4eed-8f8e-f6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return   with that driver arleady assigned', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-d0098cd7a540/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    
    
   

})
after(function(done){
    this.timeout(20000);
    chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-b0098cd7a540/2ae55c54-1a1a-4eed-8f8e-b6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                // done(err) 
                // console.log(res)                   
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("message")
            done();
            });

    // })
    
 
   
})
