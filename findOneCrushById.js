const fileContent = require('./fileContent');

const file = './crush.json';

const findOneCrushById = async (request, response) => {
  const id = parseInt(request.params.id, 10);
  const data = await fileContent(file);
  const crush = await JSON.parse(data).find((crushs) => crushs.id === id) || false;
  if (!crush) {
    return response.status(404).send({ message: 'Crush não encontrado' });
  }
  response.status(200).send(crush);
};

module.exports = findOneCrushById;
