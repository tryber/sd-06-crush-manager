const crushReader = require('../utils/crushReader.js');
const crushWriter = require('../utils/crushWriter.js');

const createCrush = async (req, res) => {
  const currentCrushes = await crushReader();
  const createdCrush = { id: currentCrushes.length + 1, ...req.body };
  const updatedCrushes = [...currentCrushes, createdCrush];
  await crushWriter(updatedCrushes);
  res.status(201).json(createdCrush);
};

module.exports = {
  createCrush,
};
