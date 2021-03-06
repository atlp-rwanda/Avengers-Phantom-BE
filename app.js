// @ts-nocheck
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocumentation = require("./src/docs/swagger.js");

const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const userRouter = require("./src/Users/Routes/users.route");
const roleRouter = require("./src/Roles/Routes/roles.route");
const busRouter = require("./src/Buses/routes/bus.route");
const AssignAndUnAssignRouter = require("./src/Assignment/DriverToBus/routes/assingDrivertoBus.route");
const routesRouter = require("./src/Route/Routes/route.route");
const stopsRouter = require('./src/RouteStops/Routes/stop.route');
const busToRouteRouter = require("./src/Assignment/BusToRoutes/Routes/AssignmentRoutes");

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });

const app = express();
app.use(middleware.handle(i18next));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: req.t('success status'),
    message: req.t('welcome message'),
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/roles", roleRouter);
app.use("/api/v1/buses", busRouter);
app.use("/api/v1/assignment", AssignAndUnAssignRouter);
app.use("/api/v1/routes", routesRouter);
app.use("/api/v1/assignbus", busToRouteRouter);
app.use('/api/v1/stops', stopsRouter);

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocumentation)
);

module.exports = app;
