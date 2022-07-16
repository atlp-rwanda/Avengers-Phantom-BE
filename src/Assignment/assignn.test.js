const app = require("../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const bcrypt = require("bcryptjs");
const {validUser, buses }=require("../docs/dummydata")

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;



const signToken = (uuid) => {
    return jwt.sign({ uuid }, process.env.JWT_SECRETE, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
const token = signToken('8e3d2a6c-5484-4d86-8eb0-40098cd7a530');
console.log(token)
const { User,Bus } = require("../../models");
before(function(done){
    this.timeout(20000);
    User.bulkCreate(validUser).then(() => console.log("Users data have been saved"));
    Bus.bulkCreate( buses).then(() => console.log("busses data have been saved"));

      done()
    // });
})
describe('Assign driver to bus tests', function(){
    it('should  assigned  drivers to buss', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-a0098cd7a540/2ae55c54-1a1a-4eed-8f8e-a6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                
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
                              
              chai.expect(res).have.status(200);
              chai.expect(res.body).be.a('object');
              chai.expect(res.body).to.have.deep.property("message")
          done();
          });

  })
      it('should get all assigned   buss', function(done){
        this.timeout(100000);
        chai.request(app)
            .get('/api/v1/assignment/buses')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                               
                chai.expect(res).have.status(200);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("result")
            done();
            });

    })
    it('should get all assigned  drivers ', function(done){
      this.timeout(100000);
      chai.request(app)
          .get('/api/v1/assignment/drivers')
          .set('Content-Type', 'application/json')
          .set({ Authorization: `Bearer ${token}` })
         
          .end((err, res) => {
              if(err){
                  console.log(err)
              } 
                                
              chai.expect(res).have.status(200);
              chai.expect(res.body).be.a('object');
              chai.expect(res.body).to.have.deep.property("drivers")
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
                
                console.log(res)                   
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
                                 
                chai.expect(res).have.status(500);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
        it('should return  no user with that id un assign', function(done){
        this.timeout(100000);
        chai.request(app)
            .put('/api/v1/assignment/unassign/9e3d2a6c-5484-4d86-8eb0-c0098fd7a54/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
            .set('Content-Type', 'application/json')
            .set({ Authorization: `Bearer ${token}` })
           
            .end((err, res) => {
                if(err){
                    console.log(err)
                } 
                console.log(res)             
                chai.expect(res).have.status(500);
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
                                 
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should return   user he is not a driver on a assign', function(done){
      this.timeout(100000);
      chai.request(app)
          .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-40098cd7a540/2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08')
          .set('Content-Type', 'application/json')
          .set({ Authorization: `Bearer ${token}` })
         
          .end((err, res) => {
              if(err){
                  console.log(err)
              } 
                             
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
                               
                chai.expect(res).have.status(403);
                chai.expect(res.body).be.a('object');
                chai.expect(res.body).to.have.deep.property("status")
            done();
            });

    })
    it('should  fail assign drivers to buss', function(done){
      this.timeout(100000);
      chai.request(app)
          .put('/api/v1/assignment/assign/9e3d2a6c-5484-4d86-8eb0-c0098cd7a540/bb')
          .set('Content-Type', 'application/json')
          .set({ Authorization: `Bearer ${token}` })
         
          .end((err, res) => {
              if(err){
                  console.log(err)
              } 
                              
              chai.expect(res).have.status(500);
              chai.expect(res.body).be.a('object');
              chai.expect(res.body).to.have.deep.property("message")
          done();
          });

  })
  it('should  fail un assign drivers to buss', function(done){
    this.timeout(100000);
    chai.request(app)
        .put('/api/v1/assignment/unassign/bb/bb')
        .set('Content-Type', 'application/json')
        .set({ Authorization: `Bearer ${token}` })
       
        .end((err, res) => {
            if(err){
                console.log(err)
            } 
                            
            chai.expect(res).have.status(500);
            chai.expect(res.body).be.a('object');
            chai.expect(res.body).to.have.deep.property("message")
        done();
        });

})
})
after(function(done){
    this.timeout(20000);
    User.destroy({ where: { uuid: ["9e3d2a6c-5484-4d86-8eb0-b0098cd7a540","9e3d2a6c-5484-4d86-8eb0-c0098cd7a540","9e3d2a6c-5484-4d86-8eb0-d0098cd7a540","9e3d2a6c-5484-4d86-8eb0-a0098cd7a540"] }})
    Bus.destroy({ where: { uuid: ["2ae55c54-1a1a-4eed-8f8e-a6c1a62e6d08","2ae55c54-1a1a-4eed-8f8e-b6c1a62e6d08","2ae55c54-1a1a-4eed-8f8e-c6c1a62e6d08","2ae55c54-1a1a-4eed-8f8e-f6c1a62e6d08","2ae55c54-1a1a-4eed-8f8e-e6c1a62e6d08"] }})
    done()
    })