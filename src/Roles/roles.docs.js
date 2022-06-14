const getAllRoles = {
  tags: ["Role"],
  summary: "Get All Roles",
  description: "List of All Roles",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              status: "success",
              message: "Role created successfully 👍🏾",
              data: {
                role: {
                  uuid: "ad11bf00-1eb8-49db-9332-4d8a3e9eda6f",
                  roleName: "Driver",
                  permissions: [
                    "start bus",
                    "stop bus",
                    "change bus speed",
                    "view bus movement",
                    "edit profile",
                  ],
                  updatedAt: "2022-04-25T14:45:29.430Z",
                  createdAt: "2022-04-25T14:45:29.430Z",
                },
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

const createRole = {
  tags: ["Role"],
  summary: "Create  a Role",
  description: "Create  a Role",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            roleName: {
              type: "string",
              description: "Name of the Role",
              example: "Admin",
            },
            permissions: {
              type: "array",
              description: "Associated Permissions to a given role",
              example: [
                "start bus",
                "stop bus",
                "change bus speed",
                "view bus movement",
                "edit profile",
              ],
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
              message: "Role created successfully 👍🏾",
              data: {
                role: {
                  uuid: "ad11bf00-1eb8-49db-9332-4d8a3e9eda6f",
                  roleName: "Admin",
                  permissions: [
                    "start bus",
                    "stop bus",
                    "change bus speed",
                    "view bus movement",
                    "edit profile",
                  ],
                  updatedAt: "2022-04-25T14:45:29.430Z",
                  createdAt: "2022-04-25T14:45:29.430Z",
                },
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

const getRoleByID = {
  tags: ["Role"],
  summary: "Get a Role By ID",
  description: "Get a Role By ID",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a Role",
      type: "string",
      example: "ad11bf00-1eb8-49db-9332-4d8a3e9eda6f",
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
              message: "Role created successfully 👍🏾",
              data: {
                role: {
                  uuid: "ad11bf00-1eb8-49db-9332-4d8a3e9eda6f",
                  roleName: "Admin",
                  permissions: [
                    "start bus",
                    "stop bus",
                    "change bus speed",
                    "view bus movement",
                    "edit profile",
                  ],
                  updatedAt: "2022-04-25T14:45:29.430Z",
                  createdAt: "2022-04-25T14:45:29.430Z",
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "No role with That ID",
    },
  },
};

const deleteRole = {
  tags: ["Role"],
  summary: "Delete a Role By ID",
  description: "Get a Role By ID",
  parameters: [
    {
      name: "uuid",
      in: "path",
      decription: "This is an ID of a Role",
      type: "string",
      example: "ad11bf00-1eb8-49db-9332-4d8a3e9eda6f",
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
                message: "Role Deleted Successully",
              },
            },
          },
        },
      },
    },
    404: {
      description: "No Role found with That ID",
    },
  },
};

const updateRole = {
  tags: ["Role"],
  summary: "Update a Role By ID",
  description: "Get a Role By ID",
  parameters: [
    {
      name: "uuid",
      required: true,
      in: "path",
      decription: "This is an ID of a Role",
      type: "string",
      example: "5db5b910-657f-4e2b-9d73-1070c10c5d11",
    },
  ],
  requestBody: {
    name: "JsonPatch",
    in: "body",
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            roleName: {
              type: "string",
              description: "Name of the Role",
              example: "Admin",
            },
            permissions: {
              type: "array",
              description: "Associated Permissions to a given role",
              example: [
                "start bus",
                "stop bus",
                "change bus speed",
                "view bus movement",
                "edit profile",
              ],
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
                role: {
                  uuid: "5db5b910-657f-4e2b-9d73-1070c10c5d11",
                  roleName: "Operator",
                  permissions: [
                    "create bus",
                    "update bus",
                    "delete bus",
                    "create route",
                    "update route",
                    "delete route",
                    "assign bus route",
                    "update bus route",
                    "delete bus route",
                    "assing driver bus",
                    "update driver bus",
                    "delete driver bus",
                    "view bus movement",
                    "edit profile",
                  ],
                  createdAt: "2022-04-25T12:19:59.138Z",
                  updatedAt: "2022-04-25T12:19:59.138Z",
                },
              },
            },
          },
        },
      },
    },
    404: {
      description: "No Role found with That ID",
    },
  },
};

const RoleRouteDoc = {
  "/api/v1/roles": {
    get: getAllRoles,
    post: createRole,
  },
  "/api/v1/roles/{uuid}": {
    get: getRoleByID,
    delete: deleteRole,
    patch: updateRole,
  },
};

module.exports = RoleRouteDoc;
