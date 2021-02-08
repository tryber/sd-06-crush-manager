const fs = require('fs');

const getCrushes = async () => {
  const arrayCrushes = await fs.readFileSync('./crush.json', 'utf-8', (err) => {
    if (err) throw new Error(err);
    console.log('File read');
  });
  return JSON.parse(arrayCrushes);
};

module.exports = { getCrushes };
