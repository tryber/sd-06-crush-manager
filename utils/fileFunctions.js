const fs = require('fs').promises;
const path = require('path').resolve;

const readFile = async (fileName) => {
  const fileRead = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  return fileRead;
};

const addCrushToFile = async (fileName, content) => {
  const fileRead = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  const parsedFile = await JSON.parse(fileRead);
  const contentToAdd = {
    ...content,
    id: parsedFile.length + 1,
  };
  await parsedFile.push(contentToAdd);
  const writeToFile = JSON.stringify(parsedFile);
  await fs.writeFile(path(__dirname, '..', `${fileName}.json`), writeToFile, 'utf-8');
  console.log(parsedFile);
  return contentToAdd.id;
};

module.exports = {
  readFile,
  addCrushToFile,
};
