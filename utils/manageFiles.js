const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async () => {
  const file = await fs.readFile(path(__dirname, '..', 'crush.json'), 'utf-8');
  return JSON.parse(file);
};

module.exports = {
  readFile,
};
