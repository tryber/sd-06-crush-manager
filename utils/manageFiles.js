const fs = require('fs/promises');
const path = require('path').resolve;

const currentPath = path();
const filePath = `${currentPath}/`;

const readFile = async (fileName) => {
  const file = await fs.readFile(`${filePath}${fileName}`, 'utf-8');

  return file;
};

const writeFile = async (fileName, content) => {
  await fs.writeFile(`${filePath}${fileName}`, content, 'utf-8');
  return true;
};

module.exports = {
  readFile,
  writeFile,
};
