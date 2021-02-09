const express = require('express');

const { readFile } = require('./useful/readAndWriteFiles');

const chushRouter = express.Router();

chushRouter.get('/', async (_req, res) => {
  const crush = await readFile('crush');
  return res.status(200).send(crush);
});

chushRouter.get('/:id', async (req, res) => {
  const crush = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  const { id } = req.params;
  const crushId = crush.find((objCrush) => objCrush.id === +id);
  if (!crushId) return res.status(404).send({ message: 'Crush não encontrado' });
  return res.status(200).send(crushId);
});

module.exports = chushRouter;
