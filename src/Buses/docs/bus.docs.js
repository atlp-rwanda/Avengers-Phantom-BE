const allbus = {
    tags: ["Buses"],
    summary: "Get All buses",
    description: "List of All buses",
    responses: {
      200: {
        description: "Sucess",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  company:"Kigali Bus Services",
                  type:"Coaster",
                  plateNumber:"RAB 100 B",
                  manufacturer:"Hyundai",
                  capacity:75,
                  yearOfManufacturing:"1995",
                  createdAt: "2022-04-25T11:49:11.535Z",
                  updatedAt: "2022-04-25T11:49:11.535Z",
                },
              },
            },
          },
        },
      },
      401: {
        description: "JWT Token Errors",
      },
      404: {
        description: "Failed!!!",
      },
    },
  };
  
  const createbus = {
    tags: ["Buses"],
    summary: "Create  a bus",
    description: "Create  a bus",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              company: {
                type: "string",
                description: "Name of the bus that owns a bus",
                example: "KBS",
              },
              type: {
                type: "string",
                description: "bus model",
                example: "coaster",
              },
              plateNumber: {
                type: "string",
                decription: "bus's plate number",
                example: "RAB 100 B",
              },
              manufacturer: {
                type: "string",
                decription: "bus's manufacturer",
                example: "Hyundai",
              },
              capacity: {
                type: "integer",
                decription: "bus's seats",
                example: 80
              },
              yearOfManufacturing: {
                type: "string",
                description: "year of manufacturing",
                example: "1995",
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
              example: {
                status: "Success",
                data: {
                  uuid: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
                  company:"Kigali Bus Services",
                  type:"Coaster",
                  plateNumber:"RAB 100 B",
                  manufacturer:"Hyundai",
                  capacity:75,
                  yearOfManufacturing:"1995",
                  createdAt: "2022-04-25T11:49:11.535Z",
                  updatedAt: "2022-04-25T11:49:11.535Z",
                },
              },
            },
          },
        },
      },
      401: {
        description: "JWT Token Errors",
      },
      403: {
        description: "Bus already exist",
      },
      404: {
        description: "Failed to create bus",
      },
    },
  };
  
  const getbusByID = {
    tags: ["Buses"],
    summary: "Get a bus By ID",
    description: "Get a bus By ID",
    parameters: [
      {
        name: "uuid",
        in: "path",
        decription: "This is an ID of a bus",
        type: "string",
        example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
      },
    ],
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                status: "Success",
                data: {
                  uuid: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
                  company:"Kigali Bus Services",
                  type:"Coaster",
                  plateNumber:"RAB 100 B",
                  manufacturer:"Hyundai",
                  capacity:75,
                  yearOfManufacturing:"1995",
                  createdAt: "2022-04-25T11:49:11.535Z",
                  updatedAt: "2022-04-25T11:49:11.535Z",
                },
              },
            },
          },
        },
      },
      401: {
        description: "JWT Token Errors",
      },
      404: {
        description: "No bus found with That ID",
      },
    },
  };
  
  const deletebus = {
    tags: ["Buses"],
    summary: "Delete a bus By ID",
    description: "Get a bus By ID",
    parameters: [
      {
        name: "uuid",
        in: "path",
        decription: "This is an ID of a bus",
        type: "string",
        example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
      },
    ],
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                status: "success",
                data: {
                  message: "bus Deleted Successully",
                },
              },
            },
          },
        },
      },
      401: {
        description: "JWT Token Errors",
      },
      404: {
        description: "No bus with That ID",
      },
    },
  };
  
  const updatebus = {
    tags: ["Buses"],
    summary: "Update a bus By ID",
    description: "Update bus by ID",
    parameters: [
      {
        name: "uuid",
        in: "path",
        decription: "This is an ID of a bus",
        type: "string",
        example: "f3b7f03d-641b-4ebd-9296-5c942bb971b6",
      },
    ],

    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              company: {
                type: "string",
                description: "Name of the bus that owns a bus",
                example: "KBS",
              },
              type: {
                type: "string",
                description: "bus model",
                example: "coaster",
              },
              plateNumber: {
                type: "string",
                decription: "bus's plate number",
                example: "RAB 100 B",
              },
              manufacturer: {
                type: "string",
                decription: "bus's manufacturer",
                example: "Hyundai",
              },
              capacity: {
                type: "integer",
                decription: "bus's seats",
                example: 80
              },
              yearOfManufacturing: {
                type: "string",
                description: "year of manufacturing",
                example: "1995",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Sucess",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                status: "success",
                data: {
                  uuid: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
                  company:"Kigali Bus Services",
                  type:"Coaster",
                  plateNumber:"RAB 100 B",
                  manufacturer:"Hyundai",
                  capacity:75,
                  yearOfManufacturing:"1995",
                  createdAt: "2022-04-25T11:49:11.535Z",
                  updatedAt: "2022-04-25T11:49:11.535Z",
                 
                },
              },
            },
          },
        },
      },
      401: {
        description: "JWT Token Errors",
      },
      404: {
        description: "No bus found with That ID",
      },
    },
  };
  const busRouteDoc = {
    "/api/v1/buses": {
      get: allbus,
      post: createbus,
    },
    "/api/v1/buses/{uuid}": {
      get: getbusByID,
      delete: deletebus,
      patch: updatebus,
    },
  };
  
  module.exports = busRouteDoc;
  