const express = require('express');

const { readFile } = require('./useful/readAndWriteFiles');

const chushRouter = express.Router();

chushRouter.get('/', async (_req, res) => {
  const crushTxt = await readFile('crush');
  return res.status(200).send(crushTxt);
});

chushRouter.get('/:id', async (req, res) => {
  const crushArray = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  const { id } = req.params;
  const crushObj = crushArray.find((objCrush) => objCrush.id === +id);
  if (!crushObj) return res.status(404).send({ message: 'Crush não encontrado' });
  return res.status(200).send(crushObj);
});

chushRouter.post('/', async (_req, res) => {
  const crushArray = await readFile('crush').then((chushTxt) => JSON.parse(chushTxt));
  return res.status(200).send(crushArray);
});

module.exports = chushRouter;
