const query = require('../utilities/promisifyQuery');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('../utilities/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const queryString = `SELECT * FROM UD${req.body.apiUserId}`;
  const results = await query(queryString);
  res.status(200).json({
    status: 'success',
    items: results.length,
    results
  });
});

exports.addUser = catchAsync(async (req, res, next) => {
  if (!req.body.rfidTag) {
    return next(new AppError('rfidTag required'));
  }
  const queryString = `INSERT INTO UD${req.body.apiUserId} (name, role, rfidTag) VALUES('${req.body.name}','${req.body.role}','${req.body.rfidTag}')`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Added user successfully'
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const queryString = `UPDATE UD${req.body.apiUserId} SET ${
    req.body.name ? 'name =' : ''
  } '${req.body.name ? req.body.name : ''}',${req.body.role ? 'role =' : ''}'${
    req.body.role ? req.body.role : ''
  }' WHERE uId=${req.params.id}`;
  const results = await query(queryString);
  if (results.changedRows === 1) {
    res.status(200).json({
      status: 'success',
      message: 'Updated user data'
    });
  } else {
    return next(new AppError("Couldn't update user data. Wrong id", 400));
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const queryString = `DELETE FROM UD${req.body.apiUserId} WHERE uId=${req.params.id}`;
  const results = await query(queryString);
  if (results.affectedRows === 1) {
    res.status(200).json({
      status: 'success',
      message: 'Deleted user '
    });
  } else {
    return next(new AppError("Couldn't delete user data. Wrong id", 400));
  }
});
