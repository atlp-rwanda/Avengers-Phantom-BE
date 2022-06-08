const login = {
  tags: ["Login"],
  summary: "Login",
  description: "Login into your account",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            email: {
              type: "string",
              description: "email of the user",
              example: "avengersphantom7@gmail.com",
            },
            password: {
              type: "string",
              description: "your password",
              example: "phantom123",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "logged in",
    },
    401: {
      description: "Something Went wrong!!!",
    },
  },
};
const loginRouteDoc = {
  "/api/v1/users/login": {
    post: login,
  },
};
module.exports = loginRouteDoc;
