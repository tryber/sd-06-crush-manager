const fs = require('fs').promises;
const readFile = require('./readFile');

async function writeFile(newCrush) {
  const fileData = await readFile('crush.json');
  fileData.push(newCrush);
  await fs.writeFile('crush.json', JSON.stringify(fileData, 0, 2));
}

module.exports = writeFile;
