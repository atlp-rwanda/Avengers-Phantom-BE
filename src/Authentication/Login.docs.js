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
      //   content: {
      //     "application/json": {
      //       schema: {
      //         type: "object",
      //         example: {
      //           status: "success",
      //           data: {
      //             token: "9c1c36ba-edf3-4d59-88e7-65ec62b3e0f2",
      //           },
      //         },
      //       },
      //     },
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
