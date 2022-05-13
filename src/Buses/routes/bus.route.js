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
  .post(protect, restrictTo("operator"), createBus)
  .get(protect, restrictTo("operator"), busPagination(Bus), getAllBuses);
router
  .route("/:uuid")
  .get(protect, restrictTo("operator"), getBus)
  .patch(protect, restrictTo("operator"), updateBus)
  .delete(protect, restrictTo("operator"), deleteBus);

module.exports = router;
