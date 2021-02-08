const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (fileName) => {
  const fileRead = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  return fileRead;
};

const writeFile = async (fileName, content) => {
  await fs.writeFile(path(__dirname, '..', `${fileName}.json`), content, 'utf-8');
  return true;
};

module.exports = {
  readFile,
  writeFile,
};
