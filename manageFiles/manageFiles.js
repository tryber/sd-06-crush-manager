const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (fileName) => {
  const file = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  return JSON.parse(file);
};

const writeFile = async (fileName, _content) => {
  await fs.writeFile(path(__dirname, '..', `${fileName} + '.json'`), 'utf-8');
  return true;
};

module.exports = {
  readFile,
  writeFile,
};
