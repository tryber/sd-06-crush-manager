const { readCrushFile } = require('./readCrushFile');
const { writeCrushInFile } = require('./writeCrushFile');

const OK = 200;

const editCrush = async (request, response) => {
  const { id } = request.params;
  const { name, age, date } = request.body;

  const crushFile = await readCrushFile();
  const crushParsed = JSON.parse(crushFile);

  const newCrush = {
    id: +id,
    name,
    age,
    date,
  };

  const crushIndex = crushParsed.findIndex((crush) => crush.id === +id);
  crushParsed[crushIndex] = newCrush;

  writeCrushInFile(crushParsed);

  return response.status(OK).json(newCrush);
};

module.exports = { editCrush };
