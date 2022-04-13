// @ts-nocheck
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./src/docs/swagger.js');

const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const userRouter = require('./src/Users/Routes/users.route');
const roleRouter = require('./src/Roles/Routes/roles.route');
const busRouter = require('./src/Buses/routes/bus.route');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Phantom Project Powered By Avengers!!'
  });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/buses', busRouter);

app.use('/api/v1/users', userRouter);

app.use(
  '/documentation',
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
);

module.exports = app;
