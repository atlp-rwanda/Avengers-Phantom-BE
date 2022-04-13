const express = require('express');
const { signup, login } = require('../../Authentication/AuthController.js');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('./../controllers/user.controller');

const { protect } = require('./../../Middlewares/Middlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(protect, getAllUsers);
router
  .route('/:uuid')
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
