const express = require('express');
const fs = require('fs').promises;

const crushRouter = express.Router();
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const readData = async () => {
  const file = await fs.readFile('crush.json', 'utf-8');
  return JSON.parse(file);
};

crushRouter.get('/crush', async (_req, res) => {
  const crushData = await readData();
  res.status(SUCCESS).json(crushData);
});

crushRouter.get('/crush/:id', async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);

  const crushData = await readData();
  const crushFound = crushData.find((crush) => crush.id === id);

  if (crushFound) return res.status(SUCCESS).json(crushFound);

  res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
});

crushRouter.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const file = await readData();
  const id = file.length + 1;

  const isValidDated = (date) ? /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date.datedAt) : true;

  if (!name) return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age) return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(BAD_REQUEST).json({ message: 'O crush deve ser maior de idade' });
  if (!date || !date.datedAt || !date.rate) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!isValidDated) return res.status(BAD_REQUEST).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  res.status(CREATED).json({ name, age, id, date });
});

module.exports = crushRouter;
