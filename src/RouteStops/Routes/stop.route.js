const express = require("express");
const { Stops } = require('../../../models')
const { protect, restrictTo, routePagination } = require('../../Middlewares/Middlewares')
const {
  createStops,
  getAllStops,
  getSingleStop,
  updateStop,
  deleteStop
} = require("../Controllers/stop.controller");

const router = express.Router();
router.route("/").get(routePagination(Stops), getAllStops);
router.route("/:id").get(getSingleStop).patch(protect, restrictTo("operator", "administrator"), updateStop).delete(protect, restrictTo("operator", "administrator"), deleteStop);
router.route("/:id").post(protect, restrictTo("operator", "administrator"), createStops);
module.exports = router;
