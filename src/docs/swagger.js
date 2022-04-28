const userRouteDoc = require('./../Users/Users.docs');
const roleRouteDoc = require('./../Roles/roles.docs');

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: 'Phantom Project Powered By Avengers',
    version: '0.0.1',
    description: 'This is Avengers Phantom RESTful APIs Documetation'
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Local dev Server'
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
      name: 'Role',
      description: 'Role Routes'
    }
  ],
  paths: {
    ...userRouteDoc,
    ...roleRouteDoc
  }
};
module.exports = swaggerDoc;
