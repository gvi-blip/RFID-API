const query = require('../utilities/promisifyQuery');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.getAllLogs = catchAsync(async (req, res, next) => {
  //INNer join by selecting the field in log table and WHERE condition will be decided from the value
  let queryString;
  let results;
  if (req.params.field === 'userId') {
    queryString = `SELECT name,role FROM UD${req.body.apiUserId} where uId = '${req.params.value}'`;
    results = await query(queryString);
    if (results.length > 0) {
      const { name } = results[0].name;
      const { role } = results[0].role;
      //UD${req.body.apiUserId}.name AS UserName,UD${req.body.apiUserId}.role,
      queryString = `SELECT AP${req.body.apiUserId}.name AS AccessPointName,L${req.body.apiUserId}.time FROM((L${req.body.apiUserId} INNER JOIN UD${req.body.apiUserId} ON L${req.body.apiUserId}.rfidTag = UD${req.body.apiUserId}.rfidTag) INNER JOIN AP${req.body.apiUserId} ON L${req.body.apiUserId}.accessPointId = AP${req.body.apiUserId}.apId ) WHERE UD${req.body.apiUserId}.uId = '${req.params.value}'`;
      results = await query(queryString);
      res.status(200).json({
        status: 'success',
        name,
        role,
        items: results.length,
        results
      });
    } else {
      return next(new AppError('UserId does not exist', 400));
    }
  } else if (req.params.field === 'accessPoint') {
    queryString = `SELECT name FROM AP${req.body.apiUserId} where apId = ${req.params.value}`;
    results = await query(queryString);
    if (results.length > 0) {
      const { name } = results[0].name;
      queryString = `SELECT UD${req.body.apiUserId}.name AS UserName,UD${req.body.apiUserId}.uId AS userId,UD${req.body.apiUserId}.role,L${req.body.apiUserId}.time FROM((L${req.body.apiUserId} INNER JOIN UD${req.body.apiUserId} ON L${req.body.apiUserId}.rfidTag = UD${req.body.apiUserId}.rfidTag) INNER JOIN AP${req.body.apiUserId} ON L${req.body.apiUserId}.accessPointId = AP${req.body.apiUserId}.apId ) WHERE L${req.body.apiUserId}.accessPointId = '${req.params.value}'`;
      results = await query(queryString);
      res.status(200).json({
        status: 'success',
        name,
        items: results.length,
        results
      });
    } else {
      return next(new AppError('AccesspointId does not exist', 400));
    }
  } else {
    return next(new AppError('Invalid field.', 400));
  }
});

exports.createRecord = catchAsync(async (req, res, next) => {
  //Get designation from rfid field
  let queryString = `SELECT role FROM UD${req.body.apiUserId} WHERE rfidTag = '${req.body.rfidTag}'`;
  let results = await query(queryString);
  console.log(results);
  const user = results[0].role;

  //Get allowed users from access point table
  queryString = `SELECT allowed FROM AP${req.body.apiUserId} WHERE apId = ${req.body.apId}`;
  results = await query(queryString);
  const allowed = results[0].allowed.split(',');
  console.log(allowed); //This should be an array.Check whil testing
  console.log(allowed.includes(user));
  //Compare both and send respone
  if (allowed.includes(user)) {
    queryString = `INSERT INTO L${
      req.body.apiUserId
    } (rfidTag, accessPointId, time) VALUES('${req.body.rfidTag}', ${
      req.body.apId
    }, ${Date.now()})`;
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
