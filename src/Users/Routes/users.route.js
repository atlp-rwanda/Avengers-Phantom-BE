const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../../Authentication/AuthController.js");
const {
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  deleteUser,
  updateRole,
} = require("./../controllers/user.controller");

const { protect, restrictTo } = require("./../../Middlewares/Middlewares");

const router = express.Router();


router.post("/register/:roleId", register);
router.post("/login", login);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.patch("/changepassword", protect, changePassword);

router.route("/").get(protect, restrictTo("administrator"), getAllUsers);
router
  .route("/:uuid")
  .get(protect, getUser)
  .patch(protect, restrictTo("administrator"), updateUser)
  .put(protect, restrictTo("administrator"), updateRole)
  .delete(protect, restrictTo("administrator"), deleteUser);
router.patch("/updateProfile/:uuid", protect, updateProfile);

module.exports = router;
