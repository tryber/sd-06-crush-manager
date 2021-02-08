const { readFile } = require('../utils/manageFiles');

const SUCCESS = 200;
const file = 'crush.json';

const getCrushes = async (_request, response, next) => {
  const crushList = await readFile(file);

  response.status(SUCCESS).send(JSON.parse(crushList));
  next();
};

module.exports = getCrushes;
