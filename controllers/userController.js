const query = require('../utilities/promisifyQuery');
const catchAsync = require('../utilities/catchAsync');

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
  const queryString = `INSERT INTO UD${req.body.apiUserId} (name, role) VALUES('${req.body.name}','${req.body.role}')`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Added user successfully'
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const queryString = `UPDATE UD${req.body.apiUserId} SET ${
    req.body.name ? 'name =' : ''
  } ${req.body.name ? req.body.name : ''},${req.body.role ? 'role =' : ''}${
    req.body.role ? req.body.role : ''
  } WHERE uId=${req.params.id}`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Updated user data'
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const queryString = `DELETE FROM UD${req.body.apiUserId} WHERE uId=${req.params.id}`;
  await query(queryString);
  res.status(200).json({
    status: 'success',
    message: 'Deleted User successfully'
  });
});
