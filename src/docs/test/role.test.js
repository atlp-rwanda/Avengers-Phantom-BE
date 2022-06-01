const app = require("../../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe("Role EndPoints testing", () => {
    it("it should get all roles", async () => {
        const res = await chai.request(app).get("/api/v1/roles");
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property("status", "success");
    });

    it("it should not get all roles", async () => {
        const res = await chai.request(app).get("/api/v1/role");
        console.log(res.body);
        expect(res.status).to.be.equal(404);
    });

    it("it should get single role", async () => {
        const SingleRole = await chai.request(app).get("/api/v1/roles");
        let SingleRoleId = SingleRole.body.data.roles.rows[0].uuid;
        const res = await chai.request(app).get(`/api/v1/roles/${SingleRoleId}`);
        console.log(res.body);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("status", "success");
    });

    it("it should not get single role", async () => {
        const SingleRole = await chai.request(app).get("/api/v1/roles");
        let SingleRoleId = SingleRole.body.data.roles.rows[0].roleName;
        const res = await chai.request(app).get(`/api/v1/roles/${SingleRoleId}`);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.property("message", "Error while getting a role");
    });

    it("it should create a role", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .send({ roleName: "administrator" });
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property(
            "message",
            "Role created successfully 👍🏾"
        );
    });

    it("it should not create a role if no role name provided", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .send({ roleName: "" });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property("message", "Please Provide a Role Name");
    });

    it("it should not create a role if role name exist", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/roles")
            .send({ roleName: "driver" });
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property(
            "message",
            "Role Name is already existing, Please try again"
        );
    });

    it("it should update a role", async () => {
        const roleTobeUpdate = await chai.request(app).get("/api/v1/roles");
        let roleId = roleTobeUpdate.body.data.roles.rows[0].uuid;
        const res = await chai
            .request(app)
            .patch(`/api/v1/roles/${roleId}`)
            .send({ roleName: "Admin updatedd" });

        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("message", "Role Updated Successfully");
    });

    it("it should not update a role", async () => {
        const roleTobeUpdate = await chai.request(app).get("/api/v1/roles");
        let roleId = roleTobeUpdate.body.data.roles.rows[0].roleName;

        const res = await chai
            .request(app)
            .patch(`/api/v1/roles/${roleId}`)
            .send({ roleName: "Admin updated" });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.property("message", "No role with that ID");
    });

    it("it should delete a role", async () => {
        const roleTobeUpdate = await chai.request(app).get("/api/v1/roles");
        let roleId = roleTobeUpdate.body.data.roles.rows[0].uuid;
        const res = await chai.request(app).delete(`/api/v1/roles/${roleId}`);
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property("message", "Role Deleted Successfully");
    });

    it("it should not delete a role if not roleId provided", async () => {
        const roleTobeUpdate = await chai.request(app).get("/api/v1/roles");
        let roleId = roleTobeUpdate.body.data.roles.rows[0].roleName;
        const res = await chai.request(app).delete(`/api/v1/roles/${roleId}`);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.have.property("message", "Error while deleting a role");
    });
});

