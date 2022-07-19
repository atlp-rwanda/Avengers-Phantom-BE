const app = require("../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

const Email = process.env.EMAIL_USERNAME;
const Password = process.env.ADMIN_PASSWORD;

const routeData = {
  name: "Nyabugogo-Downtown",
  routeCode: "NYDT",
  startLocation: "Nyabugogo",
  endLocation: "DownTown",
  distance: "20 km",
  duration: "20min",
};

const updatedRoute = {
  name: "Nyabugogo-Downtown",
  routeCode: "NYDT",
  startLocation: "Nyabugogo",
  endLocation: "DownTown",
  distance: "10 km",
  duration: "10min",
};

const invalidRoute = {
  name: "",
  routeCode: "NYDT",
  startLocation: "Nyabugogo",
  endLocation: "DownTown",
  distance: "20 km",
  duration: "20min",
};

const phantomUserCredentials = {
  email: `${Email}`,
  password: `${Password}`,
};

const siginIn = async (userInfo) => {
  const userData = await chai
    .request(app)
    .post("/api/v1/users/login")
    .send(userInfo);
  return `Bearer ${userData.body.token}`;
};

describe("Route EndPoints testing", () => {
  let uuid;
  //..............................
  it("it should create a route", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .post("/api/v1/routes")
      .set("Authorization", token)
      .send(routeData);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("status", "success");
    uuid = res.body.data.routes.uuid;
  });

  it("it should not create a route if fields are missing", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .post("/api/v1/routes")
      .set("Authorization", token)
      .send(invalidRoute);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property(
      "message",
      "Invalid Data, Please provide valid information"
    );
  });

  it("it should not create a route if route exist", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .post("/api/v1/routes")
      .set("Authorization", token)
      .send(routeData);
    expect(res.status).to.be.equal(403);
    expect(res.body).to.have.property(
      "message",
      "This route is already registered"
    );
  });
  it("it should get all routes", async () => {
    const res = await chai.request(app).get("/api/v1/routes");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("status", "success");
  });

  it("it should get single route", async () => {
    const res = await chai.request(app).get(`/api/v1/routes/${uuid}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("status", "success");
  });

  it("it should not get single route if ID is not valid", async () => {
    const res = await chai.request(app).get(`/api/v1/routes/4347068`);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("message", "Error while getting a route");
  });

  it("it should update a route", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .patch(`/api/v1/routes/${uuid}`)
      .set("Authorization", token)
      .send(updatedRoute);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message", "Route Updated Successfully");
  });

  it("it should not update route if ID is not valid", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .patch(`/api/v1/routes/4347068`)
      .set("Authorization", token)
      .send(updatedRoute);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property(
      "message",
      "Error while updating a route"
    );
  });

  it("it should delete a route", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .delete(`/api/v1/routes/${uuid}`)
      .set("Authorization", token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("message", "Route Deleted Successfully");
  });

  it("it should not delete route if ID is not valid", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .delete(`/api/v1/routes/4347068`)
      .set("Authorization", token);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("message", "Error while deleting route");
  });

  it("it should not get single route if ID is does not exists", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai.request(app).get(`/api/v1/routes/${uuid}`);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property("message", "No route with that ID");
  });

  it("it should not delete a route if ID does not exists", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .delete(`/api/v1/routes/${uuid}`)
      .set("Authorization", token);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property("message", "No route with that ID");
  });

  it("it should not update a route if ID does not exist", async () => {
    const token = await siginIn(phantomUserCredentials);
    const res = await chai
      .request(app)
      .patch(`/api/v1/routes/${uuid}`)
      .set("Authorization", token)
      .send(updatedRoute);
    expect(res.status).to.be.equal(404);
    expect(res.body).to.have.property("message", "No route with that ID");
  });
});
