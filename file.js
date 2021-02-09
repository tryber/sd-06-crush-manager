const fs = require('fs');

const readFile = async () => {
  const fileData = await fs.readFileSync('crush.json', 'utf-8');
  return JSON.parse(fileData);
};

const writeFile = async (file) => {
  await fs.writeFileSync('crush.json', file);
};

module.exports = { readFile, writeFile };
