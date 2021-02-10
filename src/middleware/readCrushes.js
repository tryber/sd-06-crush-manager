const { readFile } = require('../utils/managefile');

const readCrushes = async (_req, res) => {
  const crushes = await readFile('crush');
  const data = (JSON.parse(crushes));
  console.log(Array.isArray(data));
  res.status(200).json(data);
};

module.exports = readCrushes;
