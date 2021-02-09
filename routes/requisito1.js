const { readFile } = require('../utils/manageFiles');

const SUCCESS = 200;
const file = 'crush.json';

const getCrushes = async (_request, response, _next) => {
  const crushList = await readFile(file);

  response.status(SUCCESS).send(JSON.parse(crushList));
};

module.exports = getCrushes;
