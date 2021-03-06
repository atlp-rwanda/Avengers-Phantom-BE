require("dotenv").config();
const { DB_USER_NAME, DB_PASSWORD, DATABASE_NAME, DB_HOST, DATABASE_TEST_NAME } =
  process.env;

module.exports = {
  development: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  docker: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DATABASE_TEST_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};
