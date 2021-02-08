const fs = require('fs/promises');
const path = require('path').resolve;

const readCrushJson = async () => {
  const content = await fs.readFile(path(__dirname, '.', 'files', 'crush.json'), 'utf-8');
  return content;
};

module.exports = {
  readFile
};
