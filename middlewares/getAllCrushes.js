const { getCrushes } = require('../helpers');

const getAllCrushes = async (req, res) => {
  const crushData = await getCrushes();
  res.status(200).send(crushData);
};

module.exports = { getAllCrushes };
