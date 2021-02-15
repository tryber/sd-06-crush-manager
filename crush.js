const fs = require('fs').promises;

const readFilePromise = fs.readFile;
const file = 'crush.json';

const getAllCrushes = async (_req, res) => {
  readFilePromise(file)
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((error) => console.log(error));
};

const getCrushById = async (req, res) => {

};

module.exports = {
  getAllCrushes,
  getCrushById,
};
