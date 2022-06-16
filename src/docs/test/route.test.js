const app = require("../../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe("Route EndPoints testing", () => {
  it("it should get all routes", async () => {
    const res = await chai.request(app).get("/api/v1/routes");
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property("status", "success");
  });

  it("it should not get all routes", async () => {
    const res = await chai.request(app).get("/api/v1/routes");
    console.log(res.body);
    expect(res.status).to.be.equal(404);
  });

  it("it should get single route", async () => {
    const SingleRoute = await chai.request(app).get("/api/v1/routes");
    let SingleRouteId = SingleRoute.body.data.route.rows[0].uuid;
    const res = await chai.request(app).get(`/api/v1/routes/${SingleRouteId}`);
    console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("status", "success");
  });

  it("it should not get single route", async () => {
    const SingleRoute = await chai.request(app).get("/api/v1/routes");
    let SingleRouteId = SingleRoute.body.data.route.rows[0].name;
    const res = await chai.request(app).get(`/api/v1/routes/${SingleRouteId}`);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("message", "Error while getting a route");
  });
  //..............................
  it("it should create a route", async () => {
    const res = await chai.request(app).post("/api/v1/routes");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      "message",
      "Route created successfully 👍🏾"
    );
  });

  it("it should not create a route if no route name provided", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/routes")
      .send({ name: "" });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property("message", "Please Provide a Route Name");
  });

  it("it should not create a route if route name exist", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/routes")
      .send({ name: "driver" });
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property(
      "message",
      "Route Name is already existing, Please try again"
    );
  });

  it("it should update a route", async () => {
    const routeTobeUpdate = await chai.request(app).get("/api/v1/routes");
    let route = routeTobeUpdate.body.data.route.rows[0].uuid;
    const res = await chai
      .request(app)
      .patch(`/api/v1/routes/${route}`)
      .send({ name: "Route Updated Successfully" });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message", "Route Updated Successfully");
  });

  it("it should not update a route", async () => {
    const routeTobeUpdate = await chai.request(app).get("/api/v1/routes");
    let route = routeTobeUpdate.body.data.route.rows[0].name;

    const res = await chai
      .request(app)
      .patch(`/api/v1/routes/${route}`)
      .send({ name: "Admin updated" });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("message", "No route with that ID");
  });

  it("it should delete a route", async () => {
    await chai.request(app).get("/api/v1/routes");
    let route = routeTobeUpdate.body.data.route.rows[0].uuid;
    const res = await chai.request(app).delete(`/api/v1/routes/${route}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message", "Route Deleted Successfully");
  });

  it("it should not delete a route if not routeId provided", async () => {
    await chai.request(app).get("/api/v1/routes");
    let route = routeTobeUpdate.body.data.route.rows[0].name;
    const res = await chai.request(app).delete(`/api/v1/routes/${route}`);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property(
      "message",
      "Error while deleting a route"
    );
  });
});
