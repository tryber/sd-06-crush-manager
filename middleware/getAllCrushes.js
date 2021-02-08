const crushReader = require('../services/crushReader');

const getAllCrushes = async (_req, res) => {
  const file = await crushReader();
  return res.status(200).send(file);
};

module.exports = getAllCrushes;
