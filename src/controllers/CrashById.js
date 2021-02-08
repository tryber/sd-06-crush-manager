const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const crushs = '../../crush.json';

const readCrushs = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', crushs));

  return JSON.parse(content.toString('utf8'));
};

router.get('/:id', async (req, res) => {
  const contentCrushs = await readCrushs();
  const idCrush = req.params.id;

  const resultFilterIdCrush = contentCrushs.find((crush) => crush.id === Number(idCrush));

  if (!resultFilterIdCrush) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(resultFilterIdCrush);
});

module.exports = router;
