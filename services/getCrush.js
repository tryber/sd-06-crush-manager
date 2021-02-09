const readFile = require('./readFile.js');

const SUCCESS = 200;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;

const getData = async (_request, response) => {
  const data = await readFile();
  if (!data) return response.status(INTERNAL_ERROR).send({ message: 'Não foi possível ler o arquivo!' });
  if (data.length) return response.status(SUCCESS).send(data);
  return response.status(SUCCESS).send([]);
};

const getDataById = async (request, response) => {
  const data = await readFile();
  if (!data) return response.status(INTERNAL_ERROR).send({ message: 'Não foi possível ler o arquivo!' });
  const crushFound = data
    .filter((crush) => crush.id === parseInt(request.params.id, 10))[0];

  if (!crushFound) return response.status(NOT_FOUND).send({ message: 'Crush não encontrado' });

  return response.status(SUCCESS).send(crushFound);
};

module.exports = {
  getData,
  getDataById,
};
