const fs = require('fs');

const readFile = async () => {
  const fileData = await fs.readFileSync('crush.json', 'utf-8');
  return JSON.parse(fileData);
};

module.exports = { readFile };
