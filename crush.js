const fs = require('fs').promises;

const readFilePromise = fs.readFile;
const file = 'crush.json';

const getAllCrushes = async (_req, res) => {
  readFilePromise(file)
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((error) => console.log(error));
};

const getCrushById = async (req, res) => {
  const { id } = req.params;

  readFilePromise(file)
    .then((content) => {
      res.status(200);

      return JSON.parse(content);
    })
    .then((json) => {
      const selectedCrush = json.find((crush) => Number(crush.id) === Number(id));

      if (!selectedCrush) return res.status(404).send({ message: 'Crush não encontrado' });
      return res.send(selectedCrush);
    })
    .catch((error) => console.log(error));
};

module.exports = {
  getAllCrushes,
  getCrushById,
};
