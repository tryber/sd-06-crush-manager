const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const readData = async () => {
  const file = await fs.readFile('crush.json', 'utf-8');
  return JSON.parse(file);
};

app.use(bodyParser.json());

app.get('/crush', async (_req, res) => {
  const crushData = await readData();
  res.status(SUCCESS).json(crushData);
});

app.get('/crush/:id', async (req, res) => {
  const { id: stringId } = req.params;
  const id = parseInt(stringId, 10);

  const crushData = await readData();
  const crushFound = crushData.find((crush) => crush.id === id);

  if (crushFound) return res.status(SUCCESS).json(crushFound);

  res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  if (!email) return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  if (!isValidEmail) return res.status(BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  if (String(password).length < 6) return res.status(BAD_REQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  res.status(SUCCESS).json({ token: crypto.randomBytes(8).toString('hex') });
});

app.listen(3000);
