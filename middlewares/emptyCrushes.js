const { readFile } = require('../utils/readFile');

const emptyCrushes = async (_request, response) => {
  const crushes = await readFile();
  if (crushes.length < 1) {
    response.status(200).json([]);
  }
  response.status(200).json(JSON.parse(crushes));
};

module.exports = {
  emptyCrushes,
};
