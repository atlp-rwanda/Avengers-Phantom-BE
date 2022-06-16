const express = require("express");

const { protect, restrictTo } = require("./../../Middlewares/Middlewares");

const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} = require("./../controllers/roles.controller");

const router = express.Router();

router.route("/").post(protect, restrictTo("administrator"),createRole).get(getAllRoles);
router.route("/:uuid").get(getRole).patch(protect, restrictTo("administrator"),updateRole).delete(protect, restrictTo("administrator"),deleteRole);

module.exports = router;
