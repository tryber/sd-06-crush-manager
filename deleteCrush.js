const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const fileContent = require('./fileContent');

const file = './crush.json';

const deleteCrush = async (request, response) => {
  const { id } = request.params;
  const crushList = await fileContent(file);
  const newList = JSON.stringify(JSON.parse(crushList)
    .filter((crush) => crush.id !== parseInt(id, 10)));
  await writeFile(file, (newList));
  response.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
