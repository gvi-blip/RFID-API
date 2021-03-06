const dotenv = require('dotenv');
const path = require('path');
const AppError = require('../utilities/appError');

dotenv.config({ path: path.resolve('config.env') });
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('Error 💣', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went really wrong'
    });
  }
};

const handleTableExistingError = () => {
  return new AppError('Does not exist. Please contact support', 400);
};

const handleDuplicateEntryError = () => {
  return new AppError('This data already exists.', 400);
};

const handleEmptyBodyError = () => {
  return new AppError('Please provide the required data in request body', 400);
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'production') {
    //It is not a good practice to override the arguments of a function

    let error = { ...err }; //So a hard copy is created
    console.error(error);
    if (error.code === 'ER_NO_SUCH_TABLE') error = handleTableExistingError();
    if (error.code === 'ER_DUP_ENTRY') error = handleDuplicateEntryError();
    if (error.type === 'entity.parse.failed') error = handleEmptyBodyError();
    sendErrorProd(error, res);
  } else {
    sendErrorDev(err, res);
  }
};
