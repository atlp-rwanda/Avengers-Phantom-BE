const express = require('express');
// const { signup, login } = require("../../Authentication/AuthController.js");
const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole
} = require('./../controllers/roles.controller');

const router = express.Router();

router.route('/').post(createRole).get(getAllRoles);
router.route('/:uuid').get(getRole).patch(updateRole).delete(deleteRole);

module.exports = router;
