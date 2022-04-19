import app from "../../../app.js";
import mocha from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

var spy = sinon.spy();

describe("API testing", () => {
  it("it should display the welcome message", async () => {
    const res = await chai.request(app).get("/");
    let spyGetHome = spy(res);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      "message",
      "Welcome to Phantom Project Powered By Avengers!!"
    );
    expect(spyGetHome.called).to.be.true();
  });
});
