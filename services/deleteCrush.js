const readFile = require('./readFile.js');
const writeFile = require('./writeFile.js');

const SUCCESS = 200;

const deleteCrush = async (request, response) => {
  // const { id } = request.params;
  const id = +request.params.id;
  const data = await readFile();
  const filtered = data.filter((e) => e.id !== id);
  console.log(filtered);
  data.splice(id - 1, 1);
  // arrumar o id
  writeFile(filtered);
  response.status(SUCCESS).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
