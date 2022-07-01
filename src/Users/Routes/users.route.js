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
  changeRole,
} = require("./../controllers/user.controller");

const { protect, restrictTo, isOwner } = require("./../../Middlewares/Middlewares");

const router = express.Router();

router.post("/register/:roleId", protect, restrictTo("administrator"), register);
router.post("/login", login);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.patch("/changepassword", protect, changePassword);

// router.route("/").get(protect, restrictTo("administrator"), getAllUsers);
router.route("/").get(getAllUsers);
router
  .route("/:id")
  // .get(protect, getUser)
  .get(getUser)
  // .patch(protect, restrictTo("administrator"), updateUser)
  .patch(updateUser)
  // .put(protect, restrictTo("admin"), changeRole)
  .put(protect, changeRole)
  .delete(protect, restrictTo("administrator"), deleteUser);
router.patch("/updateProfile/:id", protect, isOwner, updateProfile);
// router.patch("/updateProfile/:id", updateProfile);

module.exports = router;
