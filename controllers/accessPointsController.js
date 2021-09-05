const query = require('../utilities/promisifyQuery');
const catchAsync = require('../utilities/catchAsync');

exports.getAllAccessPoints = catchAsync(async (req, res, next) => {
  const queryString = `SELECT * FROM AP${req.body.apiUserId}`;
  const results = await query(queryString);
  res.status(200).json({
    status: 'success',
    items: results.length,
    results
  });
});

exports.addAccessPoint = catchAsync(async (req, res, next) => {
  const queryString = `INSERT INTO AP${req.body.apiUserId} (name, allowed) VALUES('${req.body.name}','${req.body.allowed}')`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Added access point'
  });
});

exports.updateAccessPoint = catchAsync(async (req, res, next) => {
  const queryString = `UPDATE AP${req.body.apiUserId} SET ${
    req.body.name ? 'name =' : ''
  } ${req.body.name ? req.body.name : ''},${
    req.body.allowed ? 'allowed =' : ''
  }${req.body.allowed ? req.body.allowed : ''} WHERE apId=${req.params.id}`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Updated access point'
  });
});

exports.deleteAccessPoint = catchAsync(async (req, res, next) => {
  const queryString = `DELETE FROM AP${req.body.apiUserId} WHERE apId=${req.params.id}`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Deleted Access Point'
  });
});
