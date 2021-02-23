const fs = require('fs').promises;
const path = require('path');

const readFile = async () => {
  const fileCrush = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return JSON.parse(fileCrush.toString('utf-8'));
};

const writeFile = async (content) => {
  await fs.writeFile(path.resolve(__dirname, '..', 'crush.json'), content, 'utf-8');
  return true;
};

module.exports = {
  readFile,
  writeFile,
};
