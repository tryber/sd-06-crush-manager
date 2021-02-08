const fs = require('fs');

function readFile(fileName) {
  let fileData;

  try {
    fileData = fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
  } catch (error) {
    console.error(`Error reading file: ${error.path}`);
    console.log(error);
  }

  return JSON.parse(fileData);
}

module.exports = readFile;
