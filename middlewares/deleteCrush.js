const { readFile, writeCrushList } = require('../utils/index');

const deleteCrush = async (request, response) => {
  const idCrush = +request.params.id;

  const crushList = await readFile();

  const crushListJSONParsed = JSON.parse(crushList);

  const indexOfTheCrush = crushListJSONParsed.findIndex((crush) => crush.id === idCrush);

  crushListJSONParsed.splice(indexOfTheCrush, 1);

  await writeCrushList(crushList);

  return response.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = {
  deleteCrush,
};
