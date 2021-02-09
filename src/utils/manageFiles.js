const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (fileName) => {
  const file = await fs.readFile(path(__dirname, '..', 'files', `${fileName}.json`), 'utf-8');
  return file;
};

// const writeFile = async (fileName, content) => {
//   await fs.writeFile(path(__dirname, '..', 'files', `${fileName} + '.json'`), 'utf-8');
//   return true;
// };

module.exports = {
  readFile,
  // writeFile,
};
