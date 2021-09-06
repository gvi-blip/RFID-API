const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const globalErrorController = require('./controllers/errorController');
const apiuserRouter = require('./routes/apiuserRoutes');
const userRouter = require('./routes/usersRoutes');
const logRouter = require('./routes/logRoutes');
const accessRouter = require('./routes/accessPointsRoutes');
const authController = require('./controllers/authController');
const AppError = require('./utilities/appError');

dotenv.config({ path: path.resolve('config.env') });

const app = express();
app.use(express.json());
app.use(express.Router());
app.use(morgan('dev'));

app.use('api/v1/user', authController.protect, userRouter);
app.use('api/v1/apiuser', apiuserRouter);
app.use('api/v1/log', authController.protect, logRouter);
app.use('api/v1/accesspoints', authController.protect, accessRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorController);

module.exports = app;
