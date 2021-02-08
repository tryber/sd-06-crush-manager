const { parsedData } = require('./utils/readCrushData');

async function getCrush(_request, response) {
  const data = await parsedData();
  return response.status(200).send(data);
}

async function getCrushId(request, response) {
  const data = await parsedData();
  const crushId = parseInt(request.params.id, 10);
  const crushById = data.find((item) => item.id === crushId);
  response.status(200).send(crushById);
}

module.exports = {
  getCrush,
  getCrushId,
};
