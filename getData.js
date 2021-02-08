const fs = require('fs').promises;

const arquive = './crush.json';

const getData = async () => {
  const newData = await fs.readFile(arquive, 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${arquive}\n Erro: ${err}`);
      // process.exit(1);
    }
    return data;
  });
  return newData;
};

module.exports = { getData };
