const { readFile } = require('../utils/readFile');
const { writeNewCrush } = require('../utils/writeNewCrush');

const createANewCrush = async (request, response) => {
  const { name, age, date } = request.body;

  const listOfCrushes = await readFile();

  const listOfCrushesJSONParsed = JSON.parse(listOfCrushes);

  const id = listOfCrushesJSONParsed.length + 1;

  writeNewCrush(listOfCrushesJSONParsed, { id, name, age, date });

  response.status(201).json({ id, name, age, date });
};

module.exports = {
  createANewCrush,
};
