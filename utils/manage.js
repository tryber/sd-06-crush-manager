const fs = require('fs').promises;

const readFile = async () => {
  const file = await fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possivel ler o arquivo ${err}`);
      process.exit(1);
    }
    return data;
  });
  return JSON.parse(file);
};

module.exports = {
  readFile,
};
