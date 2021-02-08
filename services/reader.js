const path = require('path');
const fs = require('fs').promises;

const readFiles = async () => {
  const file = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return JSON.parse(file.toString('utf-8'));
};

module.exports = readFiles;
