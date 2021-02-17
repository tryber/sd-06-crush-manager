const fs = require('fs');
const util = require('util');

const SUCCESS = 200;
const NOT_FOUND = 404;

const readFile = util.promisify(fs.readFile);

const getAllCrushs = async (_req, res) => {
  const data = await readFile('./crush.json', 'utf8');
  res.status(SUCCESS).send(JSON.parse(data));
};

const getCrushById = async (req, res) => {
  const data = await readFile('./crush.json', 'utf8');
  const dataId = req.params.id;
  if (!JSON.parse(data)[+dataId - 1] || +dataId === 0) {
    res.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).send(JSON.parse(data)[+dataId - 1]);
};

module.exports = { getAllCrushs, getCrushById };
