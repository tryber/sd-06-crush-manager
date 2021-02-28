const express = require('express');

const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const readCrushJson = async () => {
  const content = await fs.readFile(path.resolve(__dirname, '.', 'crush.json'));
  return JSON.parse(content.toString('utf-8'));
};

router.get('/', async (_req, res) => {
  const crushList = await readCrushJson();
  if (!crushList) return res.status(200).send([]);
  res.status(200).send(crushList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const crushList = await readCrushJson();
  const filteredCrushById = crushList.filter((crush) => crush.id === +id);
  if (!filteredCrushById) return res.status(404).json({ message: 'Crush não encontrado' });
  return res.status(200).send(filteredCrushById);
});

module.exports = router;
