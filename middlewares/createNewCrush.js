const { readFile, addANewCrush } = require('../utils/index');

const createANewCrush = async (request, response) => {
  const { name, age, date } = request.body;

  const listOfCrushes = await readFile();

  const listOfCrushesJSONParsed = JSON.parse(listOfCrushes);

  const id = listOfCrushesJSONParsed.length + 1;

  addANewCrush(listOfCrushesJSONParsed, { id, name, age, date })
    .catch((error) => console.log(error.message));

  response.status(201).json({ id, name, age, date });
};

module.exports = {
  createANewCrush,
};
