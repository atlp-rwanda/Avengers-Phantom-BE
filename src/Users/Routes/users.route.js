const express = require("express");
const { signup, login } = require("../../Authentication/AuthController.js");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateRole,
} = require("./../controllers/user.controller");

const { protect, restrictTo } = require("./../../Middlewares/Middlewares");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(protect, getAllUsers);
router
  .route("/:uuid")
  .get(protect, getUser)
  .patch(protect, restrictTo("administator"), updateUser)
  .patch(protect, restrictTo("administator"), updateRole)
  .delete(protect, restrictTo("administator"), deleteUser);

module.exports = router;
