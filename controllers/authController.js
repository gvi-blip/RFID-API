const catchAsync = require('../utilities/catchAsync');
const query = require('../utilities/promisifyQuery');
const AppError = require('../utilities/appError');

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.body.userKey && !req.params.userKey) {
    return next(new AppError('Please provide a user key', 400));
  }
  const queryString = `SELECT uId FROM APIUSERS WHERE userKey = '${
    req.body.userKey || req.params.userKey
  }'`;
  const results = await query(queryString);
  console.log(results);
  if (results.length === 0) {
    return next(new AppError('You are not allowed to access this route', 403));
  }
  req.body.apiUserId = results[0].uId;
  next();
});
