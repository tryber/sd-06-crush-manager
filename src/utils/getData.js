const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (pathName) => {
  const fileName = await fs.readFile(path(__dirname, '../..', `${pathName}.json`), 'utf-8');
  return fileName;
};

const writeFile = async (pathName, content) => {
  await fs.writeFile(path(__dirname, `${pathName}.json`), content, 'utf-8');
};

readFile('crush');

module.exports = {
  readFile,
  writeFile,
};
