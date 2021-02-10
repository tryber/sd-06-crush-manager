const { readCrushFile } = require('./readCrushFile');
const { writeCrushInFile } = require('./writeCrushFile');

const OK = 200;

const deleteCrush = async (request, response) => {
  const { id } = request.params;
  const crushFile = await readCrushFile();
  const crushParsed = JSON.parse(crushFile);

  const crushFiltered = crushParsed.filter((crush) => crush.id !== +id);
  writeCrushInFile(crushFiltered);

  return response.status(OK).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { deleteCrush };
