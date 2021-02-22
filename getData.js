const fs = require('fs').promises;

const arquive = './crush.json';

const getData = async () => {
  const newData = await fs.readFile(arquive, 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${arquive}\n Erro: ${err}`);
    }
    return data;
  });
  return JSON.parse(newData);
};

module.exports = { getData };
