const express = require('express');
const fs = require('fs').promises;
const { auth, isName, isAge, isDate } = require('../middlewares');

const crushRouter = express.Router();
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const readData = async () => {
  const file = await fs.readFile('crush.json', 'utf-8');
  return JSON.parse(file);
};

crushRouter.get('/crush', async (_req, res) => {
  const crushData = await readData();
  res.status(SUCCESS).json(crushData);
});

crushRouter.get('/crush/search', auth, async (req, res) => {
  const { q } = req.query;

  const crushData = await readData();

  const searchCrush = crushData.filter((crush) => crush.name.includes(q));

  if (!q) {
    return res.status(SUCCESS).json(crushData);
  }

  if (searchCrush) {
    return res.status(SUCCESS).json(searchCrush);
  }
});

crushRouter.get('/crush/:id', async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);

  const crushData = await readData();
  const crushFound = crushData.find((crush) => crush.id === id);

  if (!crushFound) return res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });

  res.status(SUCCESS).json(crushFound);
});

crushRouter.post('/crush', auth, isName, isAge, isDate, async (req, res) => {
  const { name, age, date } = req.body;
  const crushData = await readData();
  const id = crushData.length + 1;
  const newCrush = { name, age, id, date };

  crushData.push(newCrush);
  await fs.writeFile('crush.json', JSON.stringify(crushData));

  res.status(CREATED).json({ name, age, id, date });
});

crushRouter.put('/crush/:id', auth, isName, isAge, isDate, async (req, res) => {
  const { id: stringId } = req.params;
  const { name, age, date } = req.body;
  const id = parseInt(stringId, 10);

  const crushData = await readData();
  const crushFound = crushData.findIndex((crush) => crush.id === id);

  crushData[crushFound] = { name, age, id, date };

  await fs.writeFile('crush.json', JSON.stringify(crushData));

  res.status(SUCCESS).json(crushData[crushFound]);
});

crushRouter.delete('/crush/:id', auth, async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);

  const crushData = await readData();
  const restCrushs = crushData.filter((crush) => crush.id !== id);

  await fs.writeFile('crush.json', JSON.stringify(restCrushs));

  res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

module.exports = crushRouter;
