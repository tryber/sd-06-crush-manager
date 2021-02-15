const path = require('path');
const fs = require('fs').promises;

const crush = path.join(__dirname, './crush.json');

// função de leitura
async function readJson() {
  const readData = await fs.readFile(crush);
  const parseData = JSON.parse(readData);
  return parseData;
}
// função de escrita
/* async function writeJson() {
  const readData = await fs.writeFile(crush);
  const parseData = JSON.stringify(readData);
  return parseData;
} */
function writeJson() {
  return new Promise((resolve, reject) => {
    fs.readFile(crush, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

writeJson('crush')
  .then((content) => {
    console.log(`Lido crush ${content.byteLength} bytes`);
    return writeJson('crush');
  })
  .catch((err) => {
    console.log(`Erro ao ler arquivos: ${err.message}`);
  });
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
  readJson,
  writeJson,
};
