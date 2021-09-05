const express = require('express');
const apiUserController = require('../controllers/apiUsersController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/register').post(apiUserController.registerUser);

router
  .route('/register/:userKey')
  .get(
    authController.protect,
    apiUserController.completeRegistration,
    apiUserController.createTables
  );

module.exports = router;
