const app = require("../../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const fs =require('fs');
const { Route,Role,Bus } = require("../../../models");


chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;



const routeData = {
    name:"Nyabugogo-Downtown", 
    routeCode:"NYDT", 
    startLocation:"Nyabugogo", 
    endLocation:"DownTown", 
    distance:"20 km", 
    duration:"20min" 
  }

let PLATE_NUMBER;

function generatePlate() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

PLATE_NUMBER = generatePlate();

const busData={
    company: "BMW",
    type: "BMW",
    plateNumber: PLATE_NUMBER,
    manufacturer: "BMW",
    capacity: 80,
    yearOfManufacturing: "1995",
};

const phantomUserCredentials = {
    email: "avengersphantom7@gmail.com",
    password: "phantom123"
}



const siginIn = async (userInfo) => {
  const userData = await chai.request(app).post('/api/v1/users/login').send(userInfo);
  return `Bearer ${userData.body.token}`;
}

const createRole = async(roleInfo)=>{
  const token = await siginIn(phantomUserCredentials);
  const roleData = await chai.request(app).post("/api/v1/roles").set('Authorization', token).send(roleInfo);
  return roleData.body.data.role.uuid;
}

const registerRoute = async(route)=>{
    const token = await siginIn(phantomUserCredentials);
    const routeInfo = await chai.request(app).post("/api/v1/routes").set('Authorization', token).send(route);
    return routeInfo.body.data.routes.uuid;
}

const deleteRoute = async(route)=>{
    const token = await siginIn(phantomUserCredentials);
    const routeInfo = await chai.request(app).delete(`/api/v1/routes/${route}`).set('Authorization', token);
}

const deleteBus = async(bus)=>{
    const token = await siginIn(phantomUserCredentials);
    const routeInfo = await chai.request(app).delete(`/api/v1/buses/${bus}`).set('Authorization', token);
}

const registerBus = async(bus)=>{
    const token = await siginIn(phantomUserCredentials);
    const busInfo = await chai.request(app).post("/api/v1/buses").set({ Authorization: token }).send(bus)
    return busInfo.body.data.buses.uuid;
}

describe('Bus to Route tests', () => {
    let roleId,routeId,busId
    beforeEach(async()=>{
        roleId = await createRole({roleName:"driver"});
        routeId = await registerRoute(routeData);
        busId = await registerBus(busData)

    })

    afterEach(async()=>{
        await Role.destroy({
            where: {},
            truncate: true
        });

        await Route.destroy({
        where: {},
        truncate: true
        });

        await Bus.destroy({
            where: {},
            truncate: true
          });
        

    })


    it('should  get all assigned buses', async()=>{
        const res = await chai.request(app).get(`/api/v1/assignbus`)
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.property('status', `success`)
    })

    let assignId;

    it('should  assign  bus to route', async()=>{
        const res = await chai.request(app).post(`/api/v1/assignbus/${routeId}/${busId}`)
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.property('status', `success`)

        assignId = res.body.data.assign.uuid;

    })

    it('should not assign  bus to route if there is error', async()=>{
        const res = await chai.request(app).post(`/api/v1/assignbus/${routeId}/2f6b34f2-`)
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.property('message', `Error assigning bus to route`)
    })

    it('should  not assign  bus to route if bus does not exists', async()=>{
        await deleteBus(busId);
        const res = await chai.request(app).post(`/api/v1/assignbus/${routeId}/${busId}`)
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.property('message', `No bus found with that ID`)
    })

    it('should  not assign  bus to route if route does not exists', async()=>{
        await deleteRoute(routeId);
        const res = await chai.request(app).post(`/api/v1/assignbus/${routeId}/${busId}`)
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.property('message', `No route found with that ID`)
    })

    it('should  get single assignment', async()=>{
        const res = await chai.request(app).get(`/api/v1/assignbus/${assignId}`)
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.property('status', `success`)
    })

    it('should not get single assignment if ID is invalid', async()=>{
        const res = await chai.request(app).get(`/api/v1/assignbus/2f6b34f2-`)
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.property('message', `Error assigning bus to route`)
    })

    it('should  unassign bus', async()=>{
        const res = await chai.request(app).delete(`/api/v1/assignbus/${assignId}`)
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.property('status', `success`)
    })

    it('should  not unassign bus if ID is invalid', async()=>{
        const res = await chai.request(app).delete(`/api/v1/assignbus/2f6b34f2-`)
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.property('message', `Error assigning bus to route`)
    })

    it('should  not unassign bus for non-existing assignment', async()=>{
        const res = await chai.request(app).delete(`/api/v1/assignbus/${assignId}`)
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.property("message","No assignment found with that ID")
    })

    it('should  not get non-existing assignment ', async()=>{
        const res = await chai.request(app).get(`/api/v1/assignbus/${assignId}`)
        expect(res.status).to.be.equal(404);
        expect(res.body).to.be.property("message","No assignment found with that ID")
    })
})