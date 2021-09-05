const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
//Use authcontroller in appp.js file
router.route('/').get(userController.getAllUsers).post(userController.addUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
