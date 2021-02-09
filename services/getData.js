const path = require('path');
const readFile = require('./readFile.js');

const SUCCESS = 200;
const myFile = path.resolve(__dirname, '../crush.json');

const getData = async (_request, response) => {
  const data = await readFile(myFile);
  if (data.length) return response.status(SUCCESS).send(data);
  return response.status(SUCCESS).send([]);
};

module.exports = getData;
