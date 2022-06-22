const app = require("../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

const phantomUserCredentials = {
    email: "avengersphantom7@gmail.com",
    password: "phantom123"
}

const phantomOperator={
    email:"avengersphantom70@gmail.com",
    password:"operator123"
  }

const siginIn = async (userInfo) => {
    const userData = await chai.request(app).post('/api/v1/users/login').send(userInfo);
    return `Bearer ${userData.body.token}`;
}

describe("Role EndPoints testing", () => {
    let roleId

    it("it should create a role if user is an admin", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .set('Authorization', token)
            .send({ roleName: "administrator" });
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property(
            "message",
            "Role created successfully 👍🏾"
        );

        roleId = res.body.data.role.uuid;
    });

    it("it should not create a role if user is not an admin", async () => {
        const token = await siginIn(phantomOperator);
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .set('Authorization', token)
            .send({ roleName: "administrator" });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property(
            "message",
            "You are not permitted to perform this action"
        );
    });

    it("it should not create a role if no role name provided", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .set('Authorization', token)
            .send({ roleName: "" });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property("message", "Please Provide a Role Name");
    });

    it("it should not create a role if role name exist", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .set('Authorization', token)
            .send({ roleName: "administrator" });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property(
            "message",
            "Role Name is already existing, Please try again"
        );
    });




    it("it should get all roles", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai.request(app).get("/api/v1/roles").set('Authorization', token);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("status", "success");
    });

    it("it should not get all roles", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai.request(app).get("/api/v1/role").set('Authorization', token);
        expect(res.status).to.be.equal(404);
    });

    it("it should get single role", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai.request(app).get(`/api/v1/roles/${roleId}`).set('Authorization', token);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("status", "success");
    });

    it("it should not get single role", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai.request(app).get(`/api/v1/roles/e9593f88e`).set('Authorization', token);
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property("message", "No role with that ID");
    });


    it("it should update a role", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai
            .request(app)
            .patch(`/api/v1/roles/${roleId}`)
            .set('Authorization', token)
            .send({ roleName: "operator" });

        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("message", "Role Updated Successfully");
    });

    it("it should not update a role with invalid ID", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai
            .request(app)
            .patch(`/api/v1/roles/5c6234406101`)
            .set('Authorization', token)
            .send({ roleName: "operator" });
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property("message", "No role with that ID");
    });

    it("it should delete a role", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai.request(app).delete(`/api/v1/roles/${roleId}`).set('Authorization', token);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("message", "Role Deleted Successfully");
    });

    it("it should not delete a role if not roleId provided", async () => {
        const token = await siginIn(phantomUserCredentials);
        const res = await chai.request(app).delete(`/api/v1/roles/5c6234406101`).set('Authorization', token);
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property("message", "No role with that ID");
    });
});

