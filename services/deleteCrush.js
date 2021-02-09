const readFile = require('./readFile.js');
const writeFile = require('./writeFile.js');

const SUCCESS = 200;

const deleteCrush = async (request, response) => {
  const id = +request.params.id;
  const data = await readFile();
  const filtered = data.filter((e) => e.id !== id);

  writeFile(filtered);

  response.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
