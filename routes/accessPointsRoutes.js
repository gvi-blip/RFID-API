const express = require('express');
const apController = require('../controllers/accessPointsController');

const router = express.Router();
//Use authcontroller in appp.js file
router
  .route('/')
  .get(apController.getAllAccessPoints)
  .post(apController.addAccessPoint);

router
  .route('/:id')
  .patch(apController.updateAccessPoint)
  .delete(apController.deleteAccessPoint);
module.exports = router;
