const query = require('../utilities/promisifyQuery');

const LOGS_MODEL = {
  rfidTag: 'rfidTag VARCHAR(15) CHECK(rfidTag!=null),',
  accessPointId: 'accessPointId INTEGER CHECK(accessPointId!=null),',
  time: 'time BIGINT(20)'
};

exports.createNewLogTable = async (Id) => {
  try {
    let queryStringFields = '';
    for (const field in LOGS_MODEL) {
      queryStringFields += `${LOGS_MODEL[field]}`;
    }
    const queryString = `CREATE TABLE L${Id} (${queryStringFields})`;
    const results = await query(queryString);
    if (results) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
