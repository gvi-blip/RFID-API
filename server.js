const dotenv = require('dotenv');
const path = require('path');
const database = require('./utilities/db');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥. Shutting down the server');
  console.log(err.name, err.message);

  // process.exit(1); // Code 1. The server shouldn't be left like this but there are tools and cloud providers that automatically restart it
});

const app = require('./app');

dotenv.config({ path: path.resolve('config.env') });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

database.connectToDb(false);

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection 💥. Shutting down the server');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // Code 1. The server shouldn't be left like this but there are tools and cloud providers that automatically restart it
  });
});
