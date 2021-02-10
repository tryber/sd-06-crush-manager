const { readFile } = require('../utils/managefile');

const readCrushes = async (_req, res) => {
  const crushes = await readFile('crush');
  res.status(200).json(JSON.parse(crushes));
};

module.exports = readCrushes;
