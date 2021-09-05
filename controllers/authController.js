const catchAsync = require('../utilities/catchAsync');
const query = require('../utilities/promisifyQuery');
const AppError = require('../utilities/appError');

exports.protect = catchAsync(async (req, res, next) => {
  const queryString = `SELECT uId FROM APIUSERS WHERE userKey = '${
    req.body.userKey || req.params.userKey
  }'`;
  console.log(req.body.userKey || req.params.userKey);
  const results = await query(queryString);
  console.log(results);
  if (results.length === 0) {
    return next(new AppError('You are not allowed to access this route', 400));
  }
  req.body.apiUserId = results[0].uId;
  next();
});
