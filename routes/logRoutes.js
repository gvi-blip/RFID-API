const express = require('express');
const logController = require('../controllers/logsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/:field/:value') //userKey will be in the body
  .get(authController.protect, logController.getAllLogs);

router.route('/').post(authController.protect, logController.createRecord);

module.exports = router;
