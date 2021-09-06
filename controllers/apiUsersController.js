const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const validator = require('validator');
const catchAsync = require('../utilities/catchAsync');
const query = require('../utilities/promisifyQuery');
const AppError = require('../utilities/appError');
const { sendEmail } = require('../thirdpartyservices/emails/sendgrid');
const apiUserModel = require('../models/apiUserModel');
const userModel = require('../models/userModel');
const apModel = require('../models/accessPointModel');
const logsModel = require('../models/logsModel');

dotenv.config({ path: path.resolve('config.env') });

exports.registerUser = catchAsync(async (req, res, next) => {
  //Check if valid email address
  if (!validator.isEmail(req.body.email)) {
    return next(new AppError('Invalid email address', 403));
  }

  //Hash password from req body
  const hashedPassowrd = await bcrypt.hash(req.body.password, 10);

  //Generate userkey
  const userKey = apiUserModel.generateUserKey();

  //Store email and hashed password in database
  const queryString = `INSERT INTO APIUSERS (emailId, password, userKey) VALUES('${req.body.email}','${hashedPassowrd}','${userKey}')`;
  await query(queryString);

  //Send the complete registeration link with userKey in req.params
  const msgContent = {
    subject: 'API Registeration',
    text: `Click on the link to register your application.User Key: ${userKey} Make sure no one can access this key. All requests to our API from your application will contain this key. ${process.env.completeRegisterationURL}/${userKey}`
  };
  sendEmail(msgContent, req.body.email); //Can also send html button

  //Send response
  res.status(200).json({
    status: 'success',
    message:
      'Application recieved. You will recieve a link in your email to complete your registeration. '
  });
});

exports.completeRegistration = catchAsync(async (req, res, next) => {
  //Get user key from database
  let queryString = `SELECT status,uId FROM APIUSERS WHERE userKey = '${req.params.userKey}'`;
  const results = await query(queryString);
  req.body.apiUserId = results[0].uId;

  //Check if status is unreg
  if (results[0].status === 'unreg') {
    queryString = `UPDATE APIUSERS SET status='reg' WHERE userKey = '${req.params.userKey}'`;
    await query(queryString);
    next();
  } else {
    //Already registered
    return next(new AppError('You are already registered', 400));
  }
});

exports.createTables = catchAsync(async (req, res, next) => {
  //apiUserId will be available from autcontroller.protect
  const check1 = await userModel.createNewUserTable(req.body.apiUserId);
  const check2 = await apModel.createNewAccessPointTable(req.body.apiUserId);
  const check3 = await logsModel.createNewLogTable(req.body.apiUserId);

  if (check1 && check2 && check3) {
    res.status(200).json({
      status: 'success',
      message: 'User registered successfully'
    });
  } else {
    return next(
      new AppError(
        'User registered but features may not be available. Please contact support for help',
        500
      )
    );
  }
});
