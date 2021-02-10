const path = require('path');
const fs = require('fs').promises;

const crush = path.join(__dirname, './crush.json');

async function readJson() {
  const readData = await fs.readFile(crush);
  const parseData = JSON.parse(readData);
  return parseData;
}
//  Crie o endpoint GET `/crush`
async function listRoute(request, response) {
  const data = await readJson();
  response.status(200).send(data);
}

// Crie o endepoint GET `/crush/id`
async function listRoutId(request, response) {
  const data = await readJson();
  const { id } = request.params;
  const result = data.find((objCrush) => objCrush.id === Number(id));
  if (result === undefined) return response.status(404).json({ message: 'Crush não encontrado' });
  response.status(200).send(result);
}
module.exports = {
  listRoute,
  listRoutId,
};
