//const action = require('./models/apiUserModel');
const query = require('./utilities/promisifyQuery');

const del = async () => {
  // let results = await query('SELECT * FROM APIUSERS');
  // console.log(results);
  results = await query('SELECT * FROM L15');
  console.log(results);
  // results = await query('SELECT * FROM UD15');
  // console.log(results);
  // results = await query('SELECT * FROM AP15');
  // console.log(results);
};

del();
