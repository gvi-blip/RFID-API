const query = require('../utilities/promisifyQuery');

const USER_MODEL = {
  uId: 'uId INT AUTO_INCREMENT PRIMARY KEY',
  name: 'name VARCHAR(50),',
  role: 'role VARCHAR(255),',
  rfidTag: 'rfidTag VARCHAR(15) NOT NULL UNIQUE'
};

exports.createNewUserTable = async (Id) => {
  try {
    let queryStringFields = '';
    for (const field in USER_MODEL) {
      queryStringFields += `${USER_MODEL[field]}`;
    }
    const queryString = `CREATE TABLE UD${Id} (${queryStringFields})`;
    const results = await query(queryString);
    if (results) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
