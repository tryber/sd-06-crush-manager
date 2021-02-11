const fs = require('fs');

const getCrushes = () => new Promise(
  (resolve, reject) => {
    fs.readFile('./crush.json', (err, data) => {
      if (err) reject(new Error('Não foi possível ler o arquivo'));
      resolve(JSON.parse(data));
    });
  },
);

const filterCrushes = (id) => new Promise(
  (resolve, reject) => {
    getCrushes()
      .then((r) => {
        const crushSearched = r.find((crush) => crush.id === id);
        resolve(crushSearched);
      })
      .catch((error) => reject(error));
  },
);

const getSpecificCrush = (req, res) => {
  const id = parseInt(req.params.id, 10);
  filterCrushes(id)
    .then((response) => {
      if (response !== undefined) {
        res.status(200).send(response);
      } else {
        res.status(404).send({ message: 'Crush não encontrado' });
      }
    })
    .catch((error) => res.status(400).send(error));
};

module.exports = getSpecificCrush;
