const fs = require('fs').promises;
const path = require('path');

const myFile = path.resolve(__dirname, '../crush.json');

module.exports = async (object) => new Promise((resolve, reject) => {
  const convertToString = JSON.stringify(object);
  fs.writeFile(myFile, convertToString, (err) => {
    if (err) return reject(new Error(`${err.message}`));
    resolve(object);
  });
});
