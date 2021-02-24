const fs = require('fs').promises;
const path = require('path').resolve;

const writeFile = async (fileName, content) => {
  await fs.writeFile(path(__dirname, '..', '..', `${fileName}.json`), content, 'utf-8');
  return true;
};

module.exports = writeFile;
