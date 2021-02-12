const fs = require('fs').promises;
const path = require('path').resolve;

const readFromFile = async () => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);

  return allCrushes;
};

module.exports = {
  readFromFile,
};
