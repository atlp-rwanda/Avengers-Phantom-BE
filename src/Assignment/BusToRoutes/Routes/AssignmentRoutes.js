const express = require("express");
const {AssignBusToRoute} = require('./../../../../models')
const {busToRoutePagination} = require('./../../../Middlewares/Middlewares')
const {
  createAssignment,
  getAllAssignments,
  getAssignment,
  unAssign,
} = require("./../controllers/assignBusToRouteController");



const router = express.Router();

 router.route("/").get(getAllAssignments);
router.route("/:routeId/:busId").post(createAssignment);
router.route("/:uuid").get(getAssignment).delete(unAssign);

module.exports = router;
