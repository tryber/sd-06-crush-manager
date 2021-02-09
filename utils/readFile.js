const fs = require('fs').promises;
const path = require('path');

module.exports = async () => {
  try {
    return await
    fs.readFile(path.basename('../crush.json'), 'utf8', (error, data) => {
      if (error) {
        console.error(`Não foi possivel ler o arquivo. Error: ${error}`);
        process.exit(1);
      }
      return data;
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
