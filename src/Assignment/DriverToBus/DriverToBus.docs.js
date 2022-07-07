const allDriverAssignedToBus = {
  tags: ["Assign driver"],
  summary: "Get All Assigned drivers",
  description: "List of All Assigned drivers",
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
const allAssignedBus = {
  tags: ["Assign driver"],
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
const assignDriverToBus = {
  tags: ["Assign driver"],
  summary: "Assigned a driver",
  description: "Assign drivers to bus",
  parameters: [
    {
      name: "driverId",
      in: "path",
      decription: "This is an ID of a driver",
      type: "string",
      example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
    },
    {
      name: "busId",
      in: "path",
      decription: "This is an ID of a bus",
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
const unAssignDriverToBus = {
  tags: ["Assign driver"],
  summary: "Unassigned a driver",
  description: "Unassign drivers to bus",
  parameters: [
    {
      name: "driverId",
      in: "path",
      decription: "This is an ID of a driver",
      type: "string",
      example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
    },
    {
      name: "busId",
      in: "path",
      decription: "This is an ID of a bus",
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

const AssignDriverToBusDoc = {
  "/api/v1/assignment/drivers": {
    get: allDriverAssignedToBus,
  },
  "/api/v1/assignment/buses": {
    get: allAssignedBus,
  },
  "/api/v1/assignment/assign/{driverId}/{busId}": {
    put: assignDriverToBus,
  },
  "/api/v1/assignment/unassign/{driverId}/{busId}": {
    put: unAssignDriverToBus,
  },
};

module.exports = AssignDriverToBusDoc;
