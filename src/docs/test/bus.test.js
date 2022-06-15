const server = require("../../../app.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = chai.should();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})


chai.use(chaiHttp);

let BUS_ID, PLATE_NUMBER;

/**
 *
 * Generate a random plateNumber
 */

function generatePlate() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

PLATE_NUMBER = generatePlate();

let userInfo ={
  uuid: "9e3d2a6c-5484-4d86-8eb0-40098cd7a540",
  name: "avengers",
  gender: "male",
  idNumber: 123456789,
  district: "Nyarugenge",
  sector: "Nyarugenge",
  cell: "Nyarugenge",
  email: "avengersphantom7@gmail.com",
  password: bcrypt.hash("phantom123", 12),
  telNumber: 784860836,
  roleName: "administrator",
  createdAt: new Date(),
  updatedAt: new Date(),
}


const signToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};


describe("BUS TESTING", () => {
  let token;
  beforeEach((done)=>{

    token = signToken(userInfo.uuid);
    done()
  })

  

  it("it should POST a bus", (done) => {
    let bus = {
      company: "BMW",
      type: "BMW",
      plateNumber: PLATE_NUMBER,
      manufacturer: "BMW",
      capacity: 80,
      yearOfManufacturing: "1995",
    };

    chai
      .request(server)
      .post("/api/v1/buses")
      .set({ Authorization: `Bearer ${token}` })
      .send(bus)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        BUS_ID = res.body.data.buses.uuid;
        done();
      })
  });

  it("it should not POST a duplicate bus", (done) => {
    let bus = {
      company: "BMW",
      type: "BMW",
      plateNumber: PLATE_NUMBER,
      manufacturer: "BMW",
      capacity: 80,
      yearOfManufacturing: "1995",
    };

    chai
      .request(server)
      .post("/api/v1/buses")
      .set({ Authorization: `Bearer ${token}` })
      .send(bus)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a("object");
        done();
      })
  });



  it("it should not POST a bus with missing fields", (done) => {
    let bus = {
      company: "BMW",
      type: "BMW",
      plateNumber: "",
      manufacturer: "BMW",
      capacity: 80,
      yearOfManufacturing: "1995",
    };

    chai
      .request(server)
      .post("/api/v1/buses")
      .set({ Authorization: `Bearer ${token}` })
      .send(bus)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.status.should.be.eq("fail");
        done();
      });
  });


/*
  * Test the /GET route
  */

  it("it should GET all the buses", (done) => {
    chai
      .request(server)
      .get("/api/v1/buses")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });



  it("it should not get any bus if there is internal server error", (done) => {
    chai
      .request(server)
      .get("/api/v1/buse")
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        expect(res.status).to.be.eq(404);
        res.body.should.be.a("object");
        done();
      });
  });


/*
  * Test the /GET route for a sing Bus with uuid
  */

  it("it should GET a single bus by uuid", (done) => {
    chai
      .request(server)
      .get(`/api/v1/buses/${BUS_ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });



  it("it should GET a single bus with invalid uuid", (done) => {
    chai
      .request(server)
      .get(`/api/v1/buses/12wwwweeee`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });


/*
  * Test the /PATCH route to update a Bus
  */


  it("it should UPDATE a bus", (done) => {
    let bus = {
      company: "BMW",
      type: "BMW",
      plateNumber: "RAD1234A",
      manufacturer: "BMW",
      capacity: 80,
      yearOfManufacturing: "2020",
    };

    chai
      .request(server)
      .patch(`/api/v1/buses/${BUS_ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(bus)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });



  it("it should UPDATE a bus", (done) => {
    let bus = {
      company: "BMW",
      type: "BMW",
      plateNumber: "RAD1234A",
      manufacturer: "BMW",
      capacity: 80,
      yearOfManufacturing: "2020",
    };

    chai
      .request(server)
      .patch(`/api/v1/buses/qwerty123`)
      .set({ Authorization: `Bearer ${token}` })
      .send(bus)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });


/*
  * Test the /DELETE route to delete a Bus
  */


  it("it should DELETE a bus", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/buses/${BUS_ID}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });


  it("it should DELETE a bus for invalid uuid", (done) => {
    chai
      .request(server)
      .delete(`/api/v1/buses/qwerty123`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});





