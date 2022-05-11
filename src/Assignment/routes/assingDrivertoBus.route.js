const express = require("express");
const { User } = require("./../../../models");

const {
  AssignDriverToBus,
  unAssignDriverToBus,
  AllAssignedDrivers,
  AllAssignedBusses,
} = require("./../controllers/AssignDrivertoBus.controller");

const {
  protect,
  restrictTo,
  paginatedResult,
} = require("./../../Middlewares/Middlewares");

const router = express.Router();

router
  .route("/drivers")
  .get(
    protect,
    restrictTo("operator"),
    paginatedResult(User),
    AllAssignedDrivers
  );
router.route("/buses").get(protect, restrictTo("operator"), AllAssignedBusses);

router
  .route("/assign/:driverId/:busId")
  .put(protect, restrictTo("operator"), AssignDriverToBus);
router
  .route("/unassign/:driverId/:busId")
  .put(protect, restrictTo("operator"), unAssignDriverToBus);

module.exports = router;
