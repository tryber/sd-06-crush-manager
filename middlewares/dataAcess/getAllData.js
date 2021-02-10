const fs = require('fs');

const getAllData = async (req, res, next) => {
  const jsonData = fs.readFileSync('./crush.json', 'utf8');
  console.log(jsonData, 'json data');
  const readData = JSON.parse(jsonData);
  console.log(readData);
  res.locals.readData = readData;
  console.log(res.locals.readData);
  next();
};

module.exports = getAllData;
