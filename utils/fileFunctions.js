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
  return contentToAdd.id;
};

const editCrushInFile = async (fileName, content, id) => {
  const fileRead = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  const parsedFile = await JSON.parse(fileRead);
  const editCrush = { ...content, id };
  const newFile = parsedFile.filter((crush) => crush.id !== id);
  await newFile.push(editCrush);
  const writeToFile = JSON.stringify(newFile);
  await fs.writeFile(path(__dirname, '..', `${fileName}.json`), writeToFile, 'utf-8');
};

const deleteCrushFromFile = async (fileName, id) => {
  const fileRead = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  const parsedFile = await JSON.parse(fileRead);
  const newFile = parsedFile.filter((crush) => crush.id !== id);
  const writeToFile = JSON.stringify(newFile);
  await fs.writeFile(path(__dirname, '..', `${fileName}.json`), writeToFile, 'utf-8');
};

const findCrushInFile = async (fileName, searchTerm) => {
  const fileRead = await fs.readFile(path(__dirname, '..', `${fileName}.json`), 'utf-8');
  const parsedFile = await JSON.parse(fileRead);
  const search = searchTerm.toLowerCase();
  const filteredFile = parsedFile.filter((crush) =>
    crush.name.toLowerCase().includes(`${search}`));
  return filteredFile;
};

module.exports = {
  readFile,
  addCrushToFile,
  editCrushInFile,
  deleteCrushFromFile,
  findCrushInFile,
};
