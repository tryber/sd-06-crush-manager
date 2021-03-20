const readFile = require('./read.js');

const getData = async (_req, res) => {
  const data = await readFile();
  if (!data) return res.status(500).send({ message: 'Não foi possível ler o arquivo!' });
  if (data.length) return res.status(200).send(data);
  return res.status(200).send([]);
};

const getDataById = async (request, res) => {
  const data = await readFile();
  if (!data) return res.status(500).send({ message: 'Não foi possível ler o arquivo!' });
  const persona = data
    .filter((crush) => crush.id === parseInt(request.params.id, 10))[0];

  if (!persona) return res.status(404).send({ message: 'Crush não encontrado' });

  return res.status(200).send(persona);
};

module.exports = {
  getData,
  getDataById,
};
