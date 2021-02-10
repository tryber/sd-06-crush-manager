const { readFile } = require('../utils/managefile');

const readCrushes = async (_req, res) => {
  const crushes = await readFile('crush');
  try {
    res.status(200).json(JSON.parse(crushes));
  } catch (e) {
    console.error(e);
    res.status(200).json([]);
  }
};

module.exports = readCrushes;
