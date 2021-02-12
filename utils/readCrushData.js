const fs = require('fs').promises;

const crushData = 'crush.json';

function readCrush() {
  const crush = fs.readFile(crushData, 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${crushData}\n Erro: ${err}`);
      process.exit(1);
    }
    return data;
  });
  return crush;
}

const parsedData = async () => {
  const data = await readCrush();
  return JSON.parse(data);
};

module.exports = {
  parsedData,
};
