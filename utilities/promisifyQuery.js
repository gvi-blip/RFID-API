const util = require('util');
const database = require('./db');

database.connectToDb(true);
//console.log(database.getDbInstance());
const dbInstance = database.getDbInstance();
const query = util.promisify(dbInstance.query.bind(dbInstance));

module.exports = query;
