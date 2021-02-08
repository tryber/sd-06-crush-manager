const fs = require('fs').promises;
const path = require('path');

const readFile = async () => {
  try {
    return await fs.readFile(path.basename('../crush.json'), 'utf-8', (error, data) => {
      if (error) {
        console.error(`Não foi possível ler o arquivo 'crush.json' Erro: ${error}`);
        process.exit(1);
      }
      return data;
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = {
  readFile,
};
