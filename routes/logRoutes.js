const express = require('express');
const logController = require('../controllers/logsController');

const router = express.Router();

router
  .route('/:field/:value') //userKey will be in the body
  .get(logController.getAllLogs);

router.route('/').post(logController.createRecord);

module.exports = router;
