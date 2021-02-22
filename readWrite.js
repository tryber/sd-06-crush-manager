const path = require('path');
const fs = require('fs').promises;

const pathCrush = path.join(__dirname, 'crush.json');

// função de leitura
async function readJson() {
  const readData = await fs.readFile(pathCrush, 'utf-8');
  const parseData = JSON.parse(readData);
  return parseData;
}
// função de escrita
async function writeJson(conteudo) {
  const parseData = JSON.stringify(conteudo);
  await fs.writeFile(pathCrush, parseData, 'utf-8');
  return true;
}
console.log('testando avaliador');

module.exports = {
  readJson,
  writeJson,
};
