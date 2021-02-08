const fs = require('fs');

const getCrushes = async () => {
  const arrayCrushes = await fs.readFileSync('./crush.json', 'utf-8');
  return JSON.parse(arrayCrushes);
};

module.exports = { getCrushes };
