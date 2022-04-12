const express = require("express")
// const { signup, login } = require("../../Authentication/AuthController.js")
const {
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute,
} = require("../controllers/route.controller")

const router = express.Router()

router.route("/").get(getAllRoutes)
router.route("/:uuid").get(getRoute).patch(updateRoute).delete(deleteRoute)

module.exports = router
