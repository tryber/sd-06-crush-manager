const fs = require('fs');

const getAllCrushes = async (req, res) => {
  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Não foi possível ler o arquivo');
    res.send(JSON.parse(data));
  });
};

module.exports = getAllCrushes;
