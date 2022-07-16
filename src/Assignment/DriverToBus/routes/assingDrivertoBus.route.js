const express = require("express");
const { User } = require("../../../../models");

const {
  AssignDriverToBus,
  unAssignDriverToBus,
  AllAssignedDrivers,
  AllAssignedBusses,
} = require("../../DriverToBus/controllers/AssignDrivertoBus.controller");

const {
  protect,
  restrictTo,
  paginatedResult,
} = require("../../../Middlewares/Middlewares");

const router = express.Router();

router
  .route("/drivers")
  .get(
    protect,
    restrictTo("operator"),
    paginatedResult(User),
    AllAssignedDrivers
  );
router.route("/buses").get(protect, restrictTo("operator","administrator"), AllAssignedBusses);

router
  .route("/assign/:driverId/:busId")
  .put(protect, restrictTo("operator","administrator"), AssignDriverToBus);
router
  .route("/unassign/:driverId/:busId")
  .put(protect, restrictTo("operator","administrator"), unAssignDriverToBus);

module.exports = router;
