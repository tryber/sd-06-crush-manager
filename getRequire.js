const { readJson } = require('./readWrite');

//  Crie o endpoint GET `/crush`
async function listRoute(request, response) {
  const data = await readJson();
  return response.status(200).send(data);
}

// Crie o endepoint GET `/crush/id`
async function listRoutId(request, response) {
  const data = await readJson();
  const { id } = request.params;
  const result = data.find((objCrush) => objCrush.id === Number(id));
  if (result === undefined) return response.status(404).json({ message: 'Crush não encontrado' });
  return response.status(200).send(result);
}
module.exports = {
  listRoute,
  listRoutId,
};
