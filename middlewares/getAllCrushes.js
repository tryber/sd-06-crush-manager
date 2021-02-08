const { readFile } = require('../utils/readFile');

const getAllCrushes = async (_request, response) => {
  const crushes = await readFile();
  response.status(200).json(JSON.parse(crushes));
};

module.exports = {
  getAllCrushes,
};
