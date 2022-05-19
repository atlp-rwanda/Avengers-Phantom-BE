<<<<<<< HEAD
const app = require("./../../../app");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

const token = `Bearer ${process.env.ADMIN_TOKEN}`;
const REQ_URL = "/api/v1/routes/";
let ROUTE_ID;
let EXISTING_ROUTE;

describe("POST api/v1/buses", () => {
  it("MUST CREATE ROUTE", (done) => {
    const data = {
      company: "BMW",
      type: "BMW",
      plateNumber: "RAD1234A",
      manufacturer: "BMW",
      capacity: 80,
      yearOfManufacturing: "2020",
    };
    chai
      .request(app)
      .post(REQ_URL)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(data)
      .then((res) => {
        chai.expect(res).to.have.status(200);

        done();
      })
      .catch((err) => done(err));
  });

  it("MUST FETCH ROUTES", (done) => {
    chai
      .request(server)
      .get(REQ_URL)
      .set("Authorization", token)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        const ROUTE = res.body.stack[0];
        ROUTE_ID = ROUTE.routeSlug;
        EXISTING_ROUTE = {
          origin: ROUTE.origin,
          destination: ROUTE.destination,
          distance: ROUTE.distance,
          code: ROUTE.code,
        };
        done();
      })
      .catch((err) => done(err));
  });

  it("BAD REQUEST, ROUTE ALREADY EXISTS", (done) => {
    chai
      .request(server)
      .post(REQ_URL)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(EXISTING_ROUTE)
      .then((res) => {
        chai.expect(res).to.have.status(400);

        done();
      })
      .catch((err) => done(err));
  });

  it("BAD REQUEST, MISSING PARAMS", (done) => {
    const data = {
      origin: "Kamonyi",
      destination: "Kinyinya",
    };
    chai
      .request(server)
      .post(REQ_URL)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(data)
      .then((res) => {
        chai.expect(res).have.status(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("MUST FETCH SINGLE ROUTE", (done) => {
    chai
      .request(server)
      .get(`${REQ_URL}/${ROUTE_ID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("BAD REQUEST, INVALID ROUTE ID", (done) => {
    chai
      .request(server)
      .get(`${REQ_URL}/InvalidId`)
      .set("Authorization", token)
      .then((res) => {
        chai.expect(res.status).to.equal(404);
        done();
      })
      .catch((err) => done(err));
  });

  it("MUST UPDATE ROUTE", (done) => {
    const data = {
      distance: (Math.random() * 100).toString(),
    };
    chai
      .request(server)
      .put(`${REQ_URL}/${ROUTE_ID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(data)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("MUST NOT UPDATE, INVALID ID", (done) => {
    const data = {
      status: "active",
    };
    chai
      .request(server)
      .put(`${REQ_URL}/InvalidId`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send(data)
      .then((res) => {
        chai.expect(res.status).to.equal(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("MUST DELETE ROUTE", (done) => {
    chai
      .request(server)
      .delete(`${REQ_URL}/${ROUTE_ID}`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("MUST NOT DELETE ROUTE, INVALID ID", (done) => {
    chai
      .request(server)
      .delete(`${REQ_URL}/InvalidId`)
      .set("Accept", "application/json")
      .set("Authorization", token)
      .then((res) => {
        chai.expect(res.status).to.equal(400);
        done();
      })
      .catch((err) => done(err));
  });

  it("MUST DELETE ALL ROUTE", (done) => {
    chai
      .request(server)
      .delete(REQ_URL)
      .set("Authorization", token)
      .then((res) => {
        chai.expect(res.status).to.equal(200);
        done();
      })
      .catch((err) => done(err));
=======
const server = require("../../../app.js");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { expect } = require("chai");
let should = chai.should();

chai.use(chaiHttp);

const token = `Bearer ${process.env.OPERATOR_TOKEN}`;

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

describe("BUS TESTING", () => {
  /*
   * Test the /POST route to create a new Bus
   */

  describe("/POST: WILL CREATE A NEW BUS", () => {
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
        .set("Authorization", token)
        .send(bus)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          BUS_ID = res.body.data.buses.uuid;
          done();
        });
    });
  });

  describe("/POST: WILL NOT CREATE A DUPLICATE BUS", () => {
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
        .set("Authorization", token)
        .send(bus)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST: WILL NOT CREATE A BUS If any field is missing", () => {
    it("it should not POST a bus for a bad request", (done) => {
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
        .set("Authorization", token)
        .send(bus)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.message.should.be.eq("Invalid Inputs Please Try Again");
          done();
        });
    });
  });

  /*
   * Test the /GET route
   */

  describe("/GET: WILL GET ALL BUSES", () => {
    it("it should GET all the buses", (done) => {
      chai
        .request(server)
        .get("/api/v1/buses")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET: WILL NOT GET ALL BUSES", () => {
    it("it should not get any bus if there is internal server error", (done) => {
      chai
        .request(server)
        .get("/api/v1/buse")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.status).to.be.eq(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /*
   * Test the /GET route for a sing Bus with uuid
   */

  describe("/GET: WILL GET A SINGLE BUS", () => {
    it("it should GET a single bus by uuid", (done) => {
      chai
        .request(server)
        .get(`/api/v1/buses/${BUS_ID}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET: WILL NOT GET A SINGLE BUS", () => {
    it("it should GET a single bus with invalid uuid", (done) => {
      chai
        .request(server)
        .get(`/api/v1/buses/12wwwweeee`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /*
   * Test the /PATCH route to update a Bus
   */

  describe("/PATCH: WILL UPDATE A BUS", () => {
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
        .set("Authorization", token)
        .send(bus)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/PATCH: WILL UPDATE A BUS FOR INVALID uuid", () => {
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
        .set("Authorization", token)
        .send(bus)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /*
   * Test the /DELETE route to delete a Bus
   */

  describe("/DELETE: WILL DELETE A BUS", () => {
    it("it should DELETE a bus", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/buses/${BUS_ID}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE: WILL NOT DELETE A BUS FOR INVALID uuid", () => {
    it("it should DELETE a bus for invalid uuid", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/buses/qwerty123`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
>>>>>>> 3df795b (ft(Testing bus):Bus CRUD tests)
  });
});
