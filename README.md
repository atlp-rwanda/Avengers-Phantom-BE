[![Test Coverage](https://api.codeclimate.com/v1/badges/068429e3c906946f50ec/test_coverage)](https://codeclimate.com/github/atlp-rwanda/Avengers-Phantom-BE/test_coverage)

[![Node.js%20CI](https://github.com/atlp-rwanda/Avengers-Phantom-BE/actions/workflows/phantom.yml/badge.svg)](https://github.com/atlp-rwanda/Avengers-Phantom-BE/actions/workflows/phantom.yml)

[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/Avengers-Phantom-BE/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/Avengers-Phantom-BE?branch=develop)

[![codecov](https://codecov.io/gh/atlp-rwanda/Avengers-Phantom-BE/branch/develop/graph/badge.svg?token=Y5JULKTVD5)](https://codecov.io/gh/atlp-rwanda/Avengers-Phantom-BE)

[![Maintainability](https://api.codeclimate.com/v1/badges/068429e3c906946f50ec/maintainability)](https://codeclimate.com/github/atlp-rwanda/Avengers-Phantom-BE/maintainability)




# Avengers-Phantom-BE
Backend of Avengers Phantom project for team Avengers


## Vision

## Phantom is platform chich facilitate the transport into town, we track bus location, we assign the buses to drivers and operators.

## Project setup

---

### Dotenv setup

1.  **_Get some stuffs on table_**

- Run `npm install`
- Create `.env` in project root directory
- Take a look at the `.env.example` file which is in the project root directory to have a clue on environment variables that are being used in this project
- Copy all keys from the `.env.example` file to `.env` file and add values to corresponding keys. These can be obtained from the project administrator
- Feel free to add other keys and values according to your feature requirements
  **_Note_**: Add keys in `.env.example` to ease next setup for other developers.

2. **_Time to serve_**

- For you to use your new environment variable you have to import `dotenv` module in the file where you want to utilise your environment variables and configure it. like this: `import dotenv from 'dotenv'; dotenv.config();`
- Then you'll be able to access your environment variables via `process.env.YOUR_KEY`
- That's it, you're good to go!, happy coding!

### Sequelize ORM setup

1. **_Configuring `.env`_**
   - Download and install [pgAdmin](https://www.postgresql.org/download/)
   - Create three databases, one for testing and another for development and other one for production.
   - Copy ` DEV_DATABASE_URL=postgres://postgres:yourpassword@yourhost:yourport/database-name`
     ` TEST_DATABASE_URL=postgres://postgres:yourpassword@yourhost:yourport/database-name`
     `DATABASE_URL=postgres://postgres:yourpassword@yourhost:yourport/database-name` URLs
     from `.env.example` to `.env`
   - Edit them with your real database user, password and database name.
2. **_Running Migrations_**
   - Run ` npx sequelize-cli db:migrate` in terminal to fire up migration
3. **_Undoing Migrations_**

- Run `npx sequelize-cli db:migrate:undo` to undo all migrations

4. Running Seeds

- Run `npnpxm sequelize-cli db:seed:all` in terminal to run all seeds

5. Undoing Seeds

- Run `npx sequelize-cli db:seed:undo:all` in termninal to undo all seeds data from the database

### Running server

- Run `npm run start:dev` in terminal

### Running tests

- Run `npm run test` in terminal

### Deployment URL

[Heruko App Link](https://new-avengers-be-deploy.herokuapp.com/)
### Api Documentation

[Swagger Documentation](https://new-avengers-be-deploy.herokuapp.com/documentation/#/)
