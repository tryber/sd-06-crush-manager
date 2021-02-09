const { readDatabase } = require('../utils/manageDatabase');

const getCrushById = async (request, response) => {
  const data = await readDatabase();
  const { id } = request.params;
  const crushRequired = data.find((crush) => crush.id === +id);

  if (!crushRequired) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }

  response.status(200).json(crushRequired);
};

module.exports = {
  getCrushById,
};
