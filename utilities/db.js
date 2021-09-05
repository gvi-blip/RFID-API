const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('config.env') });

let dbInstance = {};
const connectToDb = (connected) => {
  const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
  });

  db.connect();
  if (!connected) {
    db.query('SELECT 1 + 1 AS solution', (error, results) => {
      if (error) throw error;
      console.log(
        results[0].solution === 2
          ? 'CONNECTED TO DATABASE'
          : 'NOT CONNECTED TO DATABASE'
      );
    });
  }
  dbInstance = db;
  //console.log(dbInstance);
};

const getDbInstance = function () {
  return dbInstance;
};

// const check = setTimeout(() => {
//   console.log(dbInstance);
// }, 3000);
exports.connectToDb = connectToDb;
exports.getDbInstance = getDbInstance;
//module.exports = { connectToDb, dbInstance };
