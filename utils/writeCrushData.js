const fs = require('fs').promises;

const crushData = 'crush.json';

function modifyFile(newCrushArray) {
  const convertedArray = JSON.stringify(newCrushArray);
  const updatedFile = fs.writeFile(crushData, convertedArray, (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo ${crushData}\n Erro: ${err}`);
      process.exit(1);
    }
    return data;
  });
  return updatedFile;
}

module.exports = { modifyFile };
