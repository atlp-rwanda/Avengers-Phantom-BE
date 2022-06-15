const userRouteDoc = require("./../Users/Users.docs");
const roleRouteDoc = require("./../Roles/roles.docs");
const loginRouteDoc = require("./../Authentication/Login.docs");
const routeRouteDoc = require("./../Route/route.docs");

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Phantom Project Powered By Avengers",
    version: "0.0.1",
    description: "This is Avengers Phantom RESTful APIs Documetation",
  },
  servers: [
    {
      url: "http://localhost:9000",
      description: "Local dev Server",
    },
    {
      url: "http://www.avengersphantom.com",
      description: "production dev server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],

  tags: [
    {
      name: "User",
      description: "User Routes",
    },
    {
      name: "Route",
      description: "Bus Routes",
    },
  ],
  paths: {
    ...userRouteDoc,
    ...loginRouteDoc,
    ...roleRouteDoc,
    ...routeRouteDoc,
  },
};
module.exports = swaggerDoc;
