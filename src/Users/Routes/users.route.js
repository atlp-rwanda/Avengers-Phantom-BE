const express = require("express");
<<<<<<< HEAD
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../../Authentication/AuthController.js");
=======
const { register,login, forgotPassword,resetPassword, changePassword} = require("../../Authentication/AuthController.js");
>>>>>>> a64e211a93547a025269a659453311a060160476
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

router.post("/register", register);
router.post("/login", login);
<<<<<<< HEAD
router.put("/forgotpassword", forgotPassword);
router.put("/resetpassword/:token", resetPassword);
=======
router.put("/forgotpassword",forgotPassword);
router.put("/resetpassword/:token",resetPassword);
router.patch("/changepassword",protect, changePassword)
>>>>>>> a64e211a93547a025269a659453311a060160476

router.route("/").get(protect, restrictTo("administrator"), getAllUsers);
router
<<<<<<< HEAD
  .route("/:uuid")
  .get(protect, restrictTo("administrator"), getUser)
=======
.route("/:uuid")
  .get(protect, getUser)
>>>>>>> a64e211a93547a025269a659453311a060160476
  .patch(protect, restrictTo("administrator"), updateUser)
  .patch(protect, restrictTo("administrator"), updateRole)
  .delete(protect, restrictTo("administrator"), deleteUser)

router.patch("/updateProfile/:uuid", protect, updateProfile)

module.exports = router;
