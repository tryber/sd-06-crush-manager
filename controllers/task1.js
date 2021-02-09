const fs = require('fs');

const getCrushes = () => new Promise(
  (resolve, reject) => {
    fs.readFile('./crush.json', (err, data) => {
      if (err) reject(new Error('Não foi possível ler o arquivo'));
      resolve(JSON.parse(data));
    });
  },
);

const getAllCrushes = (req, res) => getCrushes()
  .then((response) => res.status(200).send(response))
  .catch((error) => res.status(400).send(error));

module.exports = getAllCrushes;
