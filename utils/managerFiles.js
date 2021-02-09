const fs = require('fs').promises;
// desta forma  o fs traz a função em forma de promises
const path = require('path');

const readerFile = async () => {
  // path.resolve traz resolução de caminhos
  const file = await fs.readFile(path.resolve(__dirname, '..', 'crush.json'), 'utf-8');
  return file;
};

const writerFile = async (content) => {
  await fs.writeFile(path.resolve(__dirname, '..', 'crush.json'), content, 'utf-8');
  return true;
};

module.exports = {
  readerFile,
  writerFile,
};
