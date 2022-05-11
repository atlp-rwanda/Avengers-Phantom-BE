const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../../Authentication/AuthController.js");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateRole,
} = require("./../controllers/user.controller");

const { protect, restrictTo } = require("./../../Middlewares/Middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);

router.route("/").get(protect, restrictTo("administrator"), getAllUsers);
router
  .route("/:uuid")
  .get(protect, restrictTo("administrator"), getUser)
  .patch(protect, restrictTo("administrator"), updateUser)
  .patch(protect, restrictTo("administrator"), updateRole)
  .delete(protect, restrictTo("administrator"), deleteUser);

module.exports = router;
