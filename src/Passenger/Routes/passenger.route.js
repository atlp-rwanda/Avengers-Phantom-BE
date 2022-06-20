const express = require("express");

const { protect, restrictTo } = require("./../../Middlewares/Middlewares");

const { 
    createPassenger,
    removePassenger,
    getAllPassengers,
    getPassenger,
    UpdatePassenger,
} = require("./../Controllers/passenger.controller");

const router = express.Router();

router.route("/").get(getAllPassengers);
router.route("/:busId").post(createPassenger).get(getAllPassengers);
router.route("/:busId/:uuid").get(getPassenger).patch(UpdatePassenger).delete(removePassenger);

module.exports = router;
