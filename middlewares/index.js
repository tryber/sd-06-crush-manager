const { readFromFile } = require('../services');

const getAllCrushes = async (request, response) => {
  const allCrushes = await readFromFile();

  return response.status(200).json(allCrushes);
};

module.exports = {
  getAllCrushes,
};
