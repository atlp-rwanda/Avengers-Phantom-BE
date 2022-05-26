const express = require("express");
const {Route} = require('./../../../models')
const {routePagination} = require('./../../Middlewares/Middlewares')
const {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
} = require("./../controllers/route.controller");

const router = express.Router();

router.route("/").post(createRoute).get(routePagination(Route),getAllRoutes);
router.route("/:uuid").get(getRoute).patch(updateRoute).delete(deleteRoute);

module.exports = router;
