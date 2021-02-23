const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (fileName) => {
  const file = await fs.readFile(path(__dirname, '..', '..', `${fileName}.json`), 'utf-8');
  return file;
};

module.exports = readFile;
