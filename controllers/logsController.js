const query = require('../utilities/promisifyQuery');
const catchAsync = require('../utilities/catchAsync');

exports.getAllLogs = catchAsync(async (req, res, next) => {
  //INNer join by selecting the field in log table and where condition will be decided from the value
});

exports.createRecord = catchAsync(async (req, res, next) => {
  //Get designation from rfid field
  let queryString = `SELECT designation FROM U${req.body.apiUserId} WHERE rfidTag = '${req.body.rfidTag}'`;
  let results = query(queryString);
  const user = results[0].designation;

  //Get allowed users from access point table
  queryString = `SELECT allowed FROM AP${req.body.apiUserId} WHERE apId = ${req.body.apId}`;
  results = await query(queryString);
  const allowed = results[0].allowed.split(',');
  console.log(allowed); //This should be an array.Check whil testing

  //Compare both and send respone
  if (allowed.includes(user)) {
    queryString = `INSERT INTO L${
      req.body.apiUserId
    } (rfiTag, apId, time) VALUES('${req.body.rfidTag}', ${
      req.body.apId
    }, '${Date.now()}}')`;
    await query(queryString);
    res.status(200).json({
      access: 'Granted'
    });
    next();
  } else {
    res.status(400).json({
      access: 'Denied'
    });
    next();
  }
});
