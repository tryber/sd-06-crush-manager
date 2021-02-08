const crushReader = require('../services/crushReader');

const getCrushes = async (_req, res) => {
  const file = await crushReader();
  console.log(file);
  return res.status(200).send(file);
};

module.exports = getCrushes;
