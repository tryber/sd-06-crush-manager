const { readFile } = require('../utils/manageFiles');

const SUCCESS = 200;
const NOTFOUND = 404;
const file = 'crush.json';

const crushById = async (request, response, next) => {
  const id = parseInt(request.params.id, 10);
  const crushList = await readFile(file);
  const crushJson = JSON.parse(crushList);

  const crushFound = crushJson.find((crush) => crush.id === id);
  if (!crushFound) response.status(NOTFOUND).json({ message: 'Crush não encontrado' });

  response.status(SUCCESS).send(crushFound);
  next();
};

module.exports = crushById;
