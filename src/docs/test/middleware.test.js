const app = require("../../../app.js");
const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");


chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

const token = `Bearer `;


const phantomUserCredentials = {
    email: "avengersphantom7@gmail.com",
    password: "phantom123"
}

const siginIn = async (userInfo) => {
    const userData = await chai.request(app).post('/api/v1/users/login').send(userInfo);
    return `Bearer ${userData.body.token}`;
}

describe("Token testings",()=>{
    it('should get not get all users information if token is not Bearer Token', async() => { 
        const res = await chai.request(app).get(`/api/v1/users`)
        expect(res.status).to.be.equal(401);
        expect(res.body).to.have.property('message', 'Something went wrong try Again!!');
        expect(res.body).to.have.property('err', "Cannot read properties of undefined (reading 'startsWith')");
    });

    it('should get not get all users information if no token provided', async() => { 
        const res = await chai.request(app).get(`/api/v1/users`).set('Authorization', token)
        expect(res.status).to.be.equal(401);
        expect(res.body).to.have.property('message', 'You are not logged in Please login to have access');
    });    
    
});