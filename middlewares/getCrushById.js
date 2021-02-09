const { readFile } = require('../utils/readFile');

const getCrushById = async (request, response) => {
  const { id } = request.params;

  const allCrushes = await readFile();

  const requestedCrush = JSON.parse(allCrushes).find((crush) => crush.id === +id); // ParseInt(id)

  if (!requestedCrush) {
    response.status(404).json({ message: 'Crush não encontrado' });
  }

  response.status(200).json(requestedCrush);
};

module.exports = {
  getCrushById,
};
