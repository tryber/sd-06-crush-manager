const readFile = require('./readFiles');

const findById = async (request, response) => {
  const crushEndPoint = await readFile('./crush.json');
  const paramId = parseInt(request.params.id, 10);
  const findCrush = JSON.parse(crushEndPoint).find((el) => paramId === el.id);
  if (!findCrush) response.status(404).send({ message: 'Crush não encontrado' });
  response.status(200).send(findCrush);
};
module.exports = findById;
