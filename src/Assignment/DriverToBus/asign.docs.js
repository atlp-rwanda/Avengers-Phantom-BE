const assigndriver = {
    tags: ["assign driver to bus"],
    summary: "assign driver to bus",
    description: "assign driver to bus",
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
        decription: "This is an ID of a Bus",
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
              example: {
                status: "success",
                message: 
                    "Email has been sent successfully to Driver's Email",
              },
            },
          },
        },
      },
      500: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                 status: "Error",
                 message: "Error while Assigning Driver To Bus",
                },
            },
          },
        },
      },
    },
  };
  const unassigndriver = {
    tags: ["unassign driver to bus"],
    summary: "unassign driver to bus",
    description: "unassign driver to bus",
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
        decription: "This is an ID of a Bus",
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
              example: {
                status: "success",
                message: 
                    "Email has been sent successfully to Driver's Email",
              },
            },
          },
        },
      },
      500: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                status: "Error",
                message: "Error While removing Driver from driving this Bus",
                },
            },
          },
        },
      },
    },
  };
  const allssigndrivers = {
    tags: ["All Assigned Busses"],
    summary: "All Assigned Busses",
    description: "All Assigned Busses",
   
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                "status": "success",
                "result": 3,
                "data": {
                  "buses": [
                    {
                      "uuid": "2ae55c54-1a1a-4eed-8f8e-d6c1a62e6d08",
                      "company": "ritco",
                      "type": "bbbb",
                      "plateNumber": "57809",
                      "manufacturer": "yutong",
                      "capacity": 40,
                      "yearOfManufacturing": "2020",
                      "isAssigned": false,
                      "user": null
                    },
                    {
                      "uuid": "a17a1d9d-f959-475f-8da3-ee3f24aa1d4f",
                      "company": "ritco",
                      "type": "bbbb",
                      "plateNumber": "57819",
                      "manufacturer": "yutong",
                      "capacity": 40,
                      "yearOfManufacturing": "2020",
                      "isAssigned": false,
                      "user": null
                    },
                    {
                      "uuid": "54535156-f6ee-4454-9b58-4f33d9f79cab",
                      "company": "ritco",
                      "type": "bbbb",
                      "plateNumber": "57619",
                      "manufacturer": "yutong",
                      "capacity": 40,
                      "yearOfManufacturing": "2020",
                      "isAssigned": false,
                      "user": null
                    }
                  ]
                }
                
              },
            },
          },
        },
      },
      500: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                status: "Error",
                message: "Error while Getting all Assigned Drivers",
                },
            },
          },
        },
      },
    },
  };
  const asignRouteDoc = {

    "/api/v1/assignment/assign/{driverId}/{busId}": {

    put: assigndriver,
    },
    "/api/v1/assignment/unassign/{driverId}/{busId}": {

        put: unassigndriver,
    },
    "/api/v1/assignment/buses": {

        get: allssigndrivers,
    },
  };
  
  module.exports = asignRouteDoc;
  
  