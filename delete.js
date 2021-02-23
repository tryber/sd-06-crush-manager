const fs = require('fs');

const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const readFile = require('./readFiles');

const deleteCrush = async (request, response) => {
  const { id } = request.params;
  const simples = await readFile('./crush.json');
  const delete1crush = JSON.stringify(JSON.parse(simples)
    .filter((el) => el.id !== parseInt(id, 10)));
  await writeFile('./crush.json', (delete1crush));
  response.status(200).send({ message: 'Crush deletado com sucesso' });
};

module.exports = deleteCrush;
