const fs = require('fs').promises;
const path = require('path');

// const filePath = path.basename('../crush.json');

// leitura de um arquivo
const readFile = async (fileName) => {
  const file = await fs.readFile(fileName, 'utf-8')
  return JSON.parse(file);
};

// escrita de um arquivo, nao carece de um retorno
const writeFile = async (fileName, content) => {
  await fs.writeFile(path(__dirname, '..', fileName), content, 'utf-8')
  return true;
};

module.exports = {
  readFile,
  writeFile
};
