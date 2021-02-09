const fs = require('fs');
const path = require('path');

const myFile = path.resolve(__dirname, '../crush.json');

const writeFile = async (object) => new Promise((resolve, reject) => {
  const convertToString = JSON.stringify(object);
  fs.writeFile(myFile, convertToString, (err) => {
    if (err) return reject(new Error(`${err.message}`));
    const crush = JSON.parse(object);
    resolve(crush);
  });
});

module.exports = writeFile;
