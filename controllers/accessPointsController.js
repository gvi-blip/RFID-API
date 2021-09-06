const query = require('../utilities/promisifyQuery');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

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
  } '${req.body.name ? req.body.name : ''}',${
    req.body.allowed ? 'allowed =' : ''
  }'${req.body.allowed ? req.body.allowed : ''}' WHERE apId=${req.params.id}`;
  const results = await query(queryString);
  if (results.changedRows === 1) {
    res.status(200).json({
      status: 'success',
      message: 'Updated access point'
    });
  } else {
    return next(new AppError("Couldn't update access point. Wrong id", 400));
  }
});

exports.deleteAccessPoint = catchAsync(async (req, res, next) => {
  const queryString = `DELETE FROM AP${req.body.apiUserId} WHERE apId=${req.params.id}`;
  const results = await query(queryString);
  if (results.affectedRows === 1) {
    res.status(200).json({
      status: 'success',
      message: 'Deleted access point '
    });
  } else {
    return next(new AppError("Couldn't delete access point. Wrong id", 400));
  }
});
