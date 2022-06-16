require("dotenv").config();
const { DB_USER_NAME, DB_PASSWORD, DATABASE_NAME, DB_HOST, DATABASE_URL } =
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
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: DATABASE_URL,
    password: DB_PASSWORD,
    database: DATABASE_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
};
