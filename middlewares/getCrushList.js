const { readFile } = require('../utils/readFile');

const getCrushList = async (_request, response) => {
  const crushList = await readFile();

  response.status(200).json(JSON.parse(crushList));
};

module.exports = {
  getCrushList,
};
