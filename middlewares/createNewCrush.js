const { readFile, writeCrushList } = require('../utils/index');

const createANewCrush = async (request, response) => {
  const { name, age, date } = request.body;

  const crushList = await readFile();

  const crushListPARSED = JSON.parse(crushList);

  const id = crushListPARSED.length + 1;

  writeCrushList(crushListPARSED, { id, name, age, date })
    .catch((error) => console.log(error.message));

  response.status(201).json({ id, name, age, date });
};

module.exports = {
  createANewCrush,
};
