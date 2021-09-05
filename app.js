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

dotenv.config({ path: path.resolve('config.env') });

const app = express();
app.use(express.json());
app.use(express.Router());
app.use(morgan('dev'));

app.use('/api/v1/appuser', userRouter);
app.use('/api/v1/user', apiuserRouter);
app.use('api/v1/log', logRouter);
app.use('api/v1/accesspoints', accessRouter);

app.use(globalErrorController);

module.exports = app;