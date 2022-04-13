const express = require("express")
const { signup } = require("../../Authentication/AuthController.js")
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/user.controller")

const router = express.Router()

router.post("/signup", signup)

router.route("/").get(getAllUsers)
router.route("/:uuid").get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
