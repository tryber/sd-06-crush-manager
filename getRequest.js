const fs = require('fs').promises;

const crushData = 'crush.json';

const readCrush = async (_request, response) => {
  const file = await fs.readFile(crushData, 'utf-8');
  const fileJson = JSON.parse(file);

  if (!file) {
    return response.status(200).json([]);
  }

  return response.status(200).json(fileJson);
};

const crushID = async (request, response) => {
  const file = await fs.readFile(crushData, 'utf-8');
  const fileJson = JSON.parse(file);

  const id = Number(request.params.id);

  const filteredCrush = fileJson.find((crush) => crush.id === id);

  if (!filteredCrush) return response.status(404).json({ message: 'Crush não encontrado' });

  return response.status(200).send(filteredCrush);
};

const search = async (request, response) => {
  const file = await fs.readFile(crushData, 'utf-8');

  const fileJson = JSON.parse(file);

  const { searchTerm } = request.query;

  const { authorization } = request.headers;

  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length < 16) return response.status(401).json({ message: 'Token inválido' });

  if (searchTerm === '' || searchTerm === undefined) return response.status(200).json(fileJson);

  const crushFound = fileJson.filter((crush) => crush.name.includes(searchTerm));

  return response.status(200).json(crushFound);
};

module.exports = {
  readCrush,
  crushID,
  search,
};
