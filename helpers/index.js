const fs = require('fs').promises;

const getCrushes = async () => {
  const arrayCrushes = await fs.readFile('./crush.json');
  return JSON.parse(arrayCrushes);
};

module.exports = { getCrushes };
