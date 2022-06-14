const express = require("express");
const {
  createBus,
  getAllBuses,
  getBus,
  updateBus,
  deleteBus,
} = require("./../controllers/bus.controller");

const { Bus } = require("./../../../models");
const { busPagination } = require("./../../Middlewares/Middlewares");
const { protect, restrictTo } = require("./../../Middlewares/Middlewares");

const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("operator","administrator"), createBus)
  .get(protect, restrictTo("operator","administrator"), busPagination(Bus), getAllBuses);
router
  .route("/:uuid")
  .get(protect, restrictTo("operator","administrator"), getBus)
  .patch(protect, restrictTo("operator","administrator"), updateBus)
  .delete(protect, restrictTo("operator","administrator"), deleteBus);

module.exports = router;
