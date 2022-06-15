<<<<<<< HEAD
const userRouteDoc = require('./../Users/Users.docs');
const roleRouteDoc = require('./../Roles/roles.docs');
=======
const userRouteDoc = require("./../Users/Users.docs");
const roleRouteDoc = require("./../Roles/roles.docs");
const loginRouteDoc = require("./../Authentication/Login.docs");
const routeRouteDoc = require("./../Route/route.docs");
>>>>>>> 404273e... documentation and test

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Phantom Project Powered By Avengers',
    version: '0.0.1',
    description: 'This is Avengers Phantom RESTful APIs Documetation'
  },
  servers: [
    {
<<<<<<< HEAD
      url: 'http://localhost:8000',
      description: 'Local dev Server'
=======
      url: "http://localhost:9000",
      description: "Local dev Server",
>>>>>>> 404273e... documentation and test
    },
    {
      url: 'http://www.avengersphantom.com',
      description: 'production dev server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],

  tags: [
    {
      name: 'User',
      description: 'User Routes'
    },
    {
<<<<<<< HEAD
      name: 'Role',
      description: 'Role Routes'
    }
  ],
  paths: {
    ...userRouteDoc,
    ...roleRouteDoc
  }
=======
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
>>>>>>> 404273e... documentation and test
};
module.exports = swaggerDoc;
