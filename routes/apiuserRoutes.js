const express = require('express');
const apiUserController = require('../controllers/apiUsersController');

const router = express.Router();

router
  .route('/register')
  .post(apiUserController.registerUser)
  .get(apiUserController.completeRegistration, apiUserController.createTables);

module.exports = router;
