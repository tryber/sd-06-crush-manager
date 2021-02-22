const fs = require('fs').promises;
const path = require('path').resolve;

// Função genérica de leitura dos dados.
const readFile = async (pathName) => {
  const fileName = await fs.readFile(path(__dirname, '../..', `${pathName}.json`), 'utf-8');
  return fileName;
};

// Função genérica de escrita dos dados.
const writeFile = async (pathName, content) => {
  await fs.writeFile(path(__dirname, '../..', `${pathName}.json`), content, 'utf-8');
};

module.exports = {
  readFile,
  writeFile,
};
