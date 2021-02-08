const fs = require('fs').promises;

const crushData = 'crush.json';

const crush = fs.readFile(crushData, 'utf8', (err, data) => {
  const parsedData = JSON.parse(data);
  if (err) {
    console.error(`Não foi possível ler o arquivo ${crushData}\n Erro: ${err}`);
    process.exit(1);
  }
  return parsedData;
});

module.exports = {
  async getCrush(_request, response) {
    const data = await crush;
    return response.status(200).send(data);
  },
};
