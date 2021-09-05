const query = require('../utilities/promisifyQuery');

const ACCESS_POINT_MODEL = {
  apId: 'apId INT AUTO_INCREMENT PRIMARY KEY,',
  name: 'name VARCHAR(50),',
  allowed: 'allowed VARCHAR(255)'
};

exports.createNewAccessPointTable = async (Id) => {
  try {
    let queryStringFields = '';
    for (const field in ACCESS_POINT_MODEL) {
      queryStringFields += `${ACCESS_POINT_MODEL[field]}`;
    }
    const queryString = `CREATE TABLE AP${Id} (${queryStringFields})`;
    const results = await query(queryString);
    if (results) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
