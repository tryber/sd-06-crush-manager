const fs = require('fs').promises;

const crushData = 'crush.json';

const crush = fs.readFile(crushData, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${crushData}\n Erro: ${err}`);
    process.exit(1);
  }
  return data;
});

const parsedData = async () => JSON.parse(await crush);

module.exports = {
  parsedData,
};
