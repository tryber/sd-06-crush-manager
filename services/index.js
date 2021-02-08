const fs = require('fs');

const getCrushes = async () => {
  const crushList = await fs.readFileSync('./crush.json', 'utf-8', (err) => {
    if (err) throw new Error(err);
    console.log('File read');
  });
  return JSON.parse(crushList);
};

module.exports = { getCrushes };
