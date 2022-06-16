const allAssignedBus = {
  tags: ["Assign buses"],
  summary: "Get All Assigned buses",
  description: "List of All Assigned buses",
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
const assignedBus = {
  tags: ["Assign buses"],
  summary: "Get one Assigned bus",
  description: "List of All Assigned bus to route",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a assigned bus",
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
const AssignBusToRoute = {
  tags: ["Assign buses"],
  summary: "Assigned buses to route",
  description: "List of All Assigned bus to route",
  parameters: [
    {
      name: "routeid",
      in: "path",
      decription: "This is an ID of a bus",
      type: "string",
      example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
    },
    {
      name: "busid",
      in: "path",
      decription: "This is an ID of a route",
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

const unAssignBusToRoute = {
  tags: ["Assign buses"],

  summary: "Unassignment of bus",
  description: "Unassignment of bus to route",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a an assignment",
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

const AssignBusToRouteDoc = {
  "/api/v1/assignbus": {
    get: allAssignedBus,
  },
  "/api/v1/assignbus/{uuid}": {
    get: assignedBus,
    delete: unAssignBusToRoute,
  },
  "/api/v1/assignbus/{routeId}/{busId}": {
    post: AssignBusToRoute,
  },
};
module.exports = AssignBusToRouteDoc;
