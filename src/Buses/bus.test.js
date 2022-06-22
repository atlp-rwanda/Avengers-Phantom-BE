const server = require("../../app.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = chai.should();
const bcrypt = require("bcryptjs");


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

const phantomUserCredentials = {
  email: "avengersphantom7@gmail.com",
  password: "phantom123"
}


const siginIn = async (userInfo) => {
  const userData = await chai.request(server).post('/api/v1/users/login').send(userInfo);
  return `Bearer ${userData.body.token}`;
}


describe("BUS TESTING", () => {
  let token;
  beforeEach(async()=>{
    token = await siginIn(phantomUserCredentials);
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
      .send(bus)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });



  it("it should not UPDATE a bus", (done) => {
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
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
      .set({ Authorization: token })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});





