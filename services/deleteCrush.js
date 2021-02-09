const readFile = require('./readFile.js');

const SUCCESS = 200;

const deleteCrush = async (request, response) => {
  const { id } = request.params;
  const data = await readFile();
  data.splice(id - 1, 1);
  response.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
