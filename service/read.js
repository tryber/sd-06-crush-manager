const fs = require('fs');
const path = require('path');

const myFile = path.resolve(__dirname, '../crush.json');

const read = async () => new Promise((resolve, reject) => {
  fs.read(myFile, 'utf-8', (err, data) => {
    if (err) return reject(new Error(`${err.message}`));
    const Datecrush = JSON.parse(data);
    resolve(Datecrush);
  });
});

module.exports = read;
