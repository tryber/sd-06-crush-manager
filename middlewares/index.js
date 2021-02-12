const { readFromFile } = require('../services');

const getAllCrushes = async (request, response) => {
  const allCrushes = await readFromFile();

  return response.status(200).json(allCrushes);
};

const getCrush = async (request, response) => {
  const { id } = request.params;
  const allCrushes = await readFromFile();
  const crush = allCrushes.find((crush) => crush.id === +id);

  if (!crush) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }

  return response.status(200).json(crush);
};

module.exports = {
  getAllCrushes,
  getCrush,
};
