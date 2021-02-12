const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (fileName) => {
  const file = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  return JSON.parse(file);
};

const writeFile = async (_fileName, content) => {
  await fs.writeFile(path(__dirname, '..', 'crush.json'), content, 'utf-8');
  return true;
};
// tirar o espaço em branco! para ver como vai estar!
module.exports = {
  readFile,
  writeFile,
};
