const fs = require('fs');
const path = require('path');

const myFile = path.resolve(__dirname, '../crush.json');

const readFile = () => new Promise((resolve, reject) => {
  fs.readFile(myFile, 'utf-8', (err, data) => {
    if (err) return reject(new Error(`${err.message}`));
    const crush = JSON.parse(data);
    // console.log(crush);
    resolve(crush);
  });
});

// const teste = async () => {
//   const pwd = await readFile('');
//   console.log(pwd);
// };

// teste();

// node services/readFile.js

module.exports = readFile;
