const fs = require('fs').promises;
const readFile = require('./readFile');

async function removeFromFile(id) {
  const allCrushes = await readFile('crush.json');
  const filteredCrushes = allCrushes.filter((crush) => crush.id !== parseInt(id, 10));

  if (filteredCrushes.length < allCrushes.length) {
    await fs.writeFile('crush.json', JSON.stringify(filteredCrushes, 0, 2));

    return true;
  }

  return false;
}

module.exports = removeFromFile;
