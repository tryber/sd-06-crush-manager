const fs = require('fs');
const path = require('path');

const myFile = path.resolve(__dirname, '../crush.json');

const write = async (object) => new Promise((resolve, reject) => {
  const convertToString = JSON.stringify(object);
  fs.writeFile(myFile, convertToString, (err) => {
    if (err) return reject(new Error(`${err.message}`));
    resolve(object);
  });
});

module.exports = write;
