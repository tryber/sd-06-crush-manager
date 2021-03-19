const readFile = require('./read.js');

const getData = async (_request, response) => {
  const data = await readFile();
  if (!data) return response.status(500).send({ message: 'Não foi possível ler o arquivo!' });
  if (data.length) return response.status(200).send(data);
  return response.status(200).send([]);
};

const getDataById = async (request, response) => {
  const data = await readFile();
  if (!data) return response.status(500).send({ message: 'Não foi possível ler o arquivo!' });
  const crushFound = data
    .filter((crush) => crush.id === parseInt(request.params.id, 10))[0];

  if (!crushFound) return response.status(404).send({ message: 'Crush não encontrado' });

  return response.status(200).send(crushFound);
};

module.exports = {
  getData,
  getDataById,
};
