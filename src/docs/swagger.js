const userRouteDoc = require("./../Users/Users.docs");
const roleRouteDoc = require("./../Roles/roles.docs");
const loginRouteDoc = require("./../Authentication/Login.docs");
const busRouteDoc = require("./../Buses/docs/bus.docs");
const routeRouteDoc = require("./../Route/route.docs");
const AssignDriverToBusDoc = require("./../Assignment/DriverToBus/DriverToBus.docs");
const AssignBusToRouteDoc = require("./../Assignment/BusToRoutes/BusToRoute.docs");
const asignRouteDoc = require("./../Assignment/DriverToBus/asign.docs");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Phantom Project Powered By Avengers",
    version: "0.0.1",
    description: "This is Avengers Phantom RESTful APIs Documetation",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT}`,
      description: "Local dev Server",
    },
    {
      url: "https://new-avengers-be-deploy.herokuapp.com/",
      description: "Production dev server",
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
      name: "Login",
      description: "User login",
    },
    {
      name: "Role",
      description: "Role Routes",
    },
    {
      name: "Buses",
      description: "Buses routes",
    },
    {
      name: "Route",
      description: "Buses routes",
    },
    {
      name: "Assign driver",
      description: "Assingning driver to buses",
    },
    {
      name: "Assign buses",
      description: "assigning bus to route",
    },
  ],

  paths: {
    ...userRouteDoc,
    ...loginRouteDoc,
    ...roleRouteDoc,
    ...busRouteDoc,
    ...routeRouteDoc,
    ...AssignDriverToBusDoc,
    ...AssignBusToRouteDoc,
    ...asignRouteDoc,
  },
};
module.exports = swaggerDoc;
