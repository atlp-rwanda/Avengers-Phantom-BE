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
  allNotifications,
  readNotification,
  deleteNotification
} = require("./../controllers/user.controller");

const { protect, restrictTo} = require("./../../Middlewares/Middlewares");
const{ parser}=require('../../utils/multer')

const router = express.Router();

router.post("/register/:roleId", protect, restrictTo("administrator"), register);
router.post("/login", login);
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
router.patch("/changepassword", protect, changePassword);
router.get("/notifications",protect,allNotifications)

router.route("/").get(protect,restrictTo("operator","administrator"), getAllUsers);
router
  .route("/:uuid")
  .get(protect, getUser)
  .patch(protect, protect, updateUser)
  .delete(protect, restrictTo("administrator"), deleteUser);
router.patch("/updateProfile/:uuid", protect,  parser.array('user_image'), updateProfile);

router.patch("/:uuid/changerole",protect,restrictTo("administrator"),changeRole)
router.route("/notifications/:uuid")
.get(protect,readNotification)
.delete(protect,deleteNotification)

module.exports = router;
