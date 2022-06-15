const { types } = require("pg");

const allRoute = {
  tags: ["Route"],
  summary: "Get All Route",
  description: "List of All Routes",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    500: {
      description: "Something Went wrong!!!",
    },
  },
};

const createRoute = {
  tags: ["Route"],
  summary: "Create Route",
  description: "create Route",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the Route",
              example: "Remera Kicukiro",
            },
            routeCode: {
              type: "string",
              description: "Route code",
              example: "NY",
            },
            startLocation: {
              type: "string",
              decription: "Location",
              example: "NYAMIRAMBO",
            },
            endLocation: {
              type: "string",
              decription: "Destination",
              example: "Kicukiro",
            },
            distance: {
              type: "string",
              decription: "distance in km",
              example: "7Km",
            },
            duration: {
              type: "string",
              description: "hours",
              example: "1hr",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Created",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    500: {
      description: "Something Went wrong!!!",
    },
  },
};

const getRouteByID = {
  tags: ["Route"],
  summary: "Get One Route",
  description: "One Route",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of the Route",
      type: "string",
      example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
    },
  ],
  responses: {
    200: {
      description: "OK",

      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    500: {
      description: "Something Went wrong!!!",
    },
  },
};

const deleteRoute = {
  tags: ["Route"],
  summary: "Delete Route",
  description: "Delete one Route",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of the Route",
      type: "string",
      example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
    },
  ],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    500: {
      description: "Something Went wrong!!!",
    },
  },
};

const updateRoute = {
  tags: ["Route"],
  summary: "Update Route",
  description: "Update Route",
  parameters: [
    {
      name: "uuid",
      in: "path",
      required: true,
      decription: "This is an ID of the Route",
      type: "string",
      example: "f3b7f03d-641b-4ebd-9296-5c942bb971b6",
    },
  ],
  requestBody: {
    name: "Patch",
    in: "body",
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the Route",
            },
            routeCode: {
              type: "string",
              description: "Route code",
            },
            startLocation: {
              type: "string",
              decription: "Location",
            },
            endLocation: {
              type: "string",
              decription: "Destination",
            },
            distance: {
              type: "string",
              decription: "distance in km",
            },
            duration: {
              type: "string",
              description: "hours",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },
    500: {
      description: "Something Went wrong!!!",
    },
  },
};
const routeRouteDoc = {
  "/api/v1/routes": {
    get: allRoute,
    post: createRoute,
  },
  "/api/v1/routes/{uuid}": {
    get: getRouteByID,
    delete: deleteRoute,
    patch: updateRoute,
  },
};

module.exports = routeRouteDoc;
