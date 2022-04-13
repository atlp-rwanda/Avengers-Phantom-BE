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
                email: "jeanndo.phanton.avengers.io",
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
}

const createUser = {
  tags: ["User"],
  summary: "Create  a User",
  description: "Create  a User",
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
            email: {
              type: "string",
              description: "User email address",
              example: "avengers.phantom.io",
            },
            role: {
              type: "string",
              description: "User must have a role to access the application",
              example: "admin",
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
                name: "Jean De Dieu UKWITEGETSE",
                email: "jeanndo.dev.io",
                role: "admin",
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
}

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
      example: "c5697c5e-9b5c-43df-adaf-f95cf99e0685",
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
                user: {
                  name: "Jean De Dieu UKWITEGETSE",
                  email: "jeanndo@gmail.com",
                  role: "admin",
                  createdAt: "2022-04-19T12:57:15.221Z",
                  updatedAt: "2022-04-19T12:57:15.221Z",
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
}

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
      example: "c5697c5e-9b5c-43df-adaf-f95cf99e0685",
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
                message: "User Delete Successully",
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
}

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
      example: "c5697c5e-9b5c-43df-adaf-f95cf99e0685",
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
                status: "success",
                message: "User Updated Successully",
                data: {
                  user: {
                    name: "Jean De Dieu",
                    email: "example@gmail.com",
                    role: "user",
                  },
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
}
const userRouteDoc = {
  "/users": {
    get: allUsers,
    post: createUser,
  },
  "/users/{uuid}": {
    get: getUserByID,
    delete: deleteUser,
    patch: updateUser,
  },
}

module.exports = userRouteDoc
