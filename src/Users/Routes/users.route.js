const express = require("express");
const { register,login, forgotPassword,resetPassword, changePassword} = require("../../Authentication/AuthController.js");
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
router.put("/forgotpassword",forgotPassword);
router.put("/resetpassword/:token",resetPassword);
router.patch("/changepassword",protect, changePassword)

router.route("/").get(protect, getAllUsers);
router
.route("/:uuid")

  .get(protect, getUser)
  .patch(protect, restrictTo("administrator"), updateUser)
  .patch(protect, restrictTo("administrator"), updateRole)
  .delete(protect, restrictTo("administrator"), deleteUser)

module.exports = router;
