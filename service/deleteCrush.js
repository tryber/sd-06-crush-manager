const readFile = require('./read.js');
const write = require('./write.js');

const deleteCrush = async (request, response) => {
  const id = +request.params.id;
  const data = await readFile();
  const filtered = data.filter((e) => e.id !== id);

  write(filtered);

  response.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
