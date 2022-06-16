const allUsers = {
  tags: ["User"],
  summary: "Get All Users",
  description: "List of All Users",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              data: {
                name: "Jean De Dieu",
                idNumber: 199980001445,
                district: "Nyarugenge",
                sector: "Nyarugenge",
                cele: "Nyarugenge",
                email: "jeanndo.phanton.avengers.io",
                permitId: "R123ewew",
                telNumber: 784860836,
                carplate: "123erty",
                vehicletype: "BWM",
                role: "admin",
              },
            },
          },
        },
      },
    },
    500: {
      description: "Something Went wrong!!!",
    },
  },
};

const createUser = {
  tags: ["User"],
  summary: "Create  a User",
  description: "Create  a User",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of the Route",
      type: "string",
      example: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the User",
              example: "Jean De Dieu",
            },
            idNumber: {
              type: "integer",
              description: "User National ID",
              example: 123456789,
            },
            district: {
              type: "string",
              decription: "User's District",
              example: "Kicukiro",
            },
            sector: {
              type: "string",
              decription: "User's Sector",
              example: "Kicukiro",
            },
            cell: {
              type: "string",
              decription: "User's Gender",
              example: "male",
            },
            email: {
              type: "string",
              description: "User email address",
              example: "avengers.phantom.io",
            },
            permitId: {
              type: "integer",
              decription: "Permit Id for Drivers",
              example: "qwerty12",
            },
            telNumber: {
              type: "integer",
              decription: "User Phone Number",
              example: 784860836,
            },
            carplate: {
              type: "string",
              decription: "Car plate Number for Drivers",
              example: "RAB123C",
            },
            capacity: {
              type: "integer",
              decription: "capacity of users for Drivers ",
              example: 80,
            },
            vehicletype: {
              type: "string",
              decription: "Type of a car for Drivers",
              example: "Litico",
            },
            role: {
              type: "string",
              description: "Role Associated to User for accessing the system",
              example: "Admin",
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Created",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              status: "success",
              data: {
                uuid: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
                name: "Izere",
                idNumber: 123456789,
                gender: "male",
                district: "Nyarugenge",
                sector: "Nyarugenge",
                cell: "Nyarugenge",
                email: "Izere@gmail.com",
                permitId: "bmw123",
                telNumber: 784860836,
                carplate: "RAB347XZ",
                capacity: 80,
                vehicletype: "Quostar",
                password:
                  "$2a$12$G/DwAwhFBNZPoH.h6I.6zeyPW/MEdL6Af8B3pkqDKfCiicvFKBjSO",
                role: "operator",
                createdAt: "2022-04-25T11:49:11.535Z",
                updatedAt: "2022-04-25T11:49:11.535Z",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Invalid Data!!",
    },
  },
};

const getUserByID = {
  tags: ["User"],
  summary: "Get a User By ID",
  description: "Get a User By ID",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a User",
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
              data: {
                uuid: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
                name: "Izere",
                idNumber: 123456789,
                gender: "male",
                district: "Nyarugenge",
                sector: "Nyarugenge",
                cell: "Nyarugenge",
                email: "Izere@gmail.com",
                permitId: "bmw123",
                telNumber: 784860836,
                carplate: "RAB347XZ",
                capacity: 80,
                vehicletype: "Quostar",
                password:
                  "$2a$12$G/DwAwhFBNZPoH.h6I.6zeyPW/MEdL6Af8B3pkqDKfCiicvFKBjSO",
                role: "operator",
                createdAt: "2022-04-25T11:49:11.535Z",
                updatedAt: "2022-04-25T11:49:11.535Z",
              },
            },
          },
        },
      },
    },
    404: {
      description: "No user found with That ID",
    },
  },
};

const deleteUser = {
  tags: ["User"],
  summary: "Delete a User By ID",
  description: "Get a User By ID",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a User",
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
              data: {
                message: "User Deleted Successully",
              },
            },
          },
        },
      },
    },
    404: {
      description: "No user with That ID",
    },
  },
};

const updateUser = {
  tags: ["User"],
  summary: "Update a User By ID",
  description: "Get a User By ID",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a User",
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
              description: "Name of the User",
              example: "Jean De Dieu",
            },
            gender: {
              type: "string",
              description: "gender",
              example: "male",
            },
            idNumber: {
              type: "integer",
              description: "User National ID",
              example: 123456789,
            },
            district: {
              type: "string",
              decription: "User's District",
              example: "Kicukiro",
            },
            sector: {
              type: "string",
              decription: "User's Sector",
              example: "Kicukiro",
            },
            cell: {
              type: "string",
              decription: "User's Gender",
              example: "male",
            },
            email: {
              type: "string",
              description: "User email address",
              example: "avengers.phantom.io",
            },

            telNumber: {
              type: "integer",
              decription: "User Phone Number",
              example: 784860836,
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
            example: {
              status: "success",
              data: {
                user: {
                  uuid: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
                  name: "Izere",
                  idNumber: 123456789,
                  gender: "male",
                  district: "Nyarugenge",
                  sector: "Nyarugenge",
                  cell: "Nyarugenge",
                  email: "Izere@gmail.com",
                  permitId: "bmw123",
                  telNumber: 784860836,
                  carplate: "RAB347XZ",
                  capacity: 80,
                  vehicletype: "Quostar",
                  password:
                    "$2a$12$G/DwAwhFBNZPoH.h6I.6zeyPW/MEdL6Af8B3pkqDKfCiicvFKBjSO",
                  role: "operator",
                  createdAt: "2022-04-25T11:49:11.535Z",
                  updatedAt: "2022-04-25T11:49:11.535Z",
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "No user found with That ID",
    },
  },
};
const userRouteDoc = {
  "/api/v1/users": {
    get: allUsers,
  },
  "/api/v1/users/register/{uuid}": {
    post: createUser,
  },
  "/api/v1/users/{uuid}": {
    get: getUserByID,
    delete: deleteUser,
    patch: updateUser,
  },
};

module.exports = userRouteDoc;
