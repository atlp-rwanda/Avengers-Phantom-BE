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

router.route("/").post(createRole).get(getAllRoles);
router.route("/:uuid").get(getRole).patch(updateRole).delete(deleteRole);

module.exports = router;
