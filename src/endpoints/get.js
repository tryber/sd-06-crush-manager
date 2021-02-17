// endpoint GET
const fs = require('fs').promises;

const SUCCESS = 200;
const NOT_FOUND = 404;
const emptyCrushList = [];
const firstIndex = 0;
const minimumLength = 1;

module.exports = {
  async getChrushes(_req, res) {
    const data = await fs.readFile('./crush.json', 'utf-8');
    if (data) {
      res.status(SUCCESS).send(JSON.parse(data));
    } else {
      res.status(SUCCESS).send(emptyCrushList);
    }
  },

  async getCrushById(req, res) {
    const crushId = +req.params.id;
    const data = await fs.readFile('./crush.json', 'utf8');
    const selectedCrush = JSON.parse(data).filter((crush) => crush.id === crushId);
    if (selectedCrush.length >= minimumLength) {
      res.status(SUCCESS).send(selectedCrush[firstIndex]);
    } else {
        res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
    }
  },
};
