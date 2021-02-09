const fs = require('fs');
const path = require('path');

const myFile = path.resolve(__dirname, '../crush.json');

const readFile = async () => new Promise((resolve, reject) => {
  fs.readFile(myFile, 'utf-8', (err, data) => {
    if (err) return reject(new Error(`${err.message}`));
    const crush = JSON.parse(data);
    resolve(crush);
  });
});

module.exports = readFile;
