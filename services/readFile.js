const fs = require('fs');

const readFile = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) return reject(new Error(`${err.message}`));
    const crush = JSON.parse(data);
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
