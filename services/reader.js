const path = require('path');
const fs = require('fs').promises;

const readFiles = async () => {
  const file = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'));
  return JSON.parse(file);
};

const writingFile = async (file) => {
  const crush = path.resolve(__dirname, '..', 'crush.json');
  const data = await fs.writeFile(crush, JSON.stringify(file));
  return data;
};

async function writer(file) {
  const crush = path.resolve(__dirname, '..', 'newCrush.json');
  const data = await fs.writeFile(crush, JSON.stringify(file));
  return data;
}

module.exports = { readFiles, writingFile, writer };
