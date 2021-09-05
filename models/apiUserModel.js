const query = require('../utilities/promisifyQuery');

const API_USER_MODEL = {
  apiUserId: 'uId INT AUTO_INCREMENT PRIMARY KEY',
  emailId: 'emailId VARCHAR(255) NOT NULL UNIQUE,',
  password: 'password VARCHAR(255) NOT NULL ,',
  status: 'status VARCHAR(10) DEFAULT "unreg"',
  userKey: 'userKey VARCHAR(255) NOT NULL UNIQUE'
};

exports.createNewUserTable = async (Id) => {
  try {
    let queryStringFields = '';
    for (const field in API_USER_MODEL) {
      queryStringFields += `${API_USER_MODEL[field]}`;
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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
exports.generateUserKey = () => {
  let string = '';
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const lowercase = [];
  const uppercase = [];
  for (let i = 97; i <= 122; i += 1) {
    lowercase.push(String.fromCharCode(i));
    uppercase.push(String.fromCharCode(i - 32));
  }
  for (let i = 0; i < 6; i += 1) {
    switch (getRndInteger(1, 4)) {
      case 1:
        string += `${digits[getRndInteger(0, 9)]}`;
        break;
      case 2:
        string += `${lowercase[getRndInteger(0, 25)]}`;
        break;
      case 3:
        string += `${uppercase[getRndInteger(0, 25)]}`;
        break;
      default:
        break;
    }
  }
  return string;
};
