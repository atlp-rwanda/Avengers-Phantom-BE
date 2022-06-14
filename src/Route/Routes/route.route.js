const express = require("express");
const { Route } = require('./../../../models')
const { protect, restrictTo, routePagination } = require('./../../Middlewares/Middlewares')
const {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
} = require("./../controllers/route.controller");

const router = express.Router();

router.route("/").post(protect, restrictTo("operator", "administrator"), createRoute).get(routePagination(Route), getAllRoutes);
// router.route("/:uuid").get(getRoute).patch(protect, restrictTo("operator","administrator"),updateRoute).delete(protect, restrictTo("operator","administrator"),deleteRoute);
router.route("/:id").get(getRoute).patch(protect, restrictTo("operator", "administrator"), updateRoute).delete(deleteRoute);

module.exports = router;
