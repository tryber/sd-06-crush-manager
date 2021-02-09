const fs = require('fs').promises;
const path = require('path');

const getAllCrushes = async (_req, res) => {
  const file = path.join(__dirname, 'crush.json');

  const allCrushes = await fs.readFile(file);

  res.status(200);
  return res.send(JSON.parse(allCrushes));
};

module.exports = { getAllCrushes };
