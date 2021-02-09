const fs = require('fs');

async function readFile(fileName) {
  let fileData;

  try {
    fileData = await fs.readFileSync(fileName, { encoding: 'utf8', flag: 'r' });
  } catch (error) {
    console.error(`Error reading file: ${error.path}`);
    console.log(error);
  }

  return JSON.parse(fileData);
}

module.exports = readFile;
