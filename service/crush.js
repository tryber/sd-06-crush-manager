const fs = require('fs').promises;
const path = require('path');

const readCrush = async () => {
  const file = await fs.readFile(path.join(__dirname, '..', 'crush.json'), 'utf-8');
  return JSON.parse(file);
};

module.exports = readCrush;
