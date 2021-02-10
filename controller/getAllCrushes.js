const { getCrushes } = require('../services');

const getAllCrushes = async (_req, res) => {
  const crushData = await getCrushes();
  res.status(200).send(crushData);
};

module.exports = { getAllCrushes };
