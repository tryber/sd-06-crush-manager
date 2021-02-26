const express = require('express');
const crypto = require('crypto');

const app = express();
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const possiblesCrush = await fs.readFile('./crush.json');
  if (possiblesCrush.length === 0) {
    res.status(SUCCESS).json([]);
  }
  res.status(SUCCESS).json(JSON.parse(possiblesCrush));
});

app.get('/crush/:id', async (req, res) => {
  const possiblesCrush = await fs.readFile('./crush.json');
  const id = parseInt(req.params.id, 10);
  const filterCrush = JSON.parse(possiblesCrush)
    .find((crush) => id === crush.id);
  if (!filterCrush) res.status(404).send({ message: 'Crush não encontrado' });

  res.status(SUCCESS).json(filterCrush);
});

const validEmail = (email) => {
  const pattern = /[\w]{3,30}@[\w]{3,8}.[\w]{2,7}/mg;
  return pattern.test(email);
};

const validPassword = (pass) => {
  const pattern = /[\w]{6,30}/mg;
  return pattern.test(pass);
};

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!validEmail(email)) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!validPassword(password)) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = await crypto.randomBytes(8).toString('hex');
  res.send({ token });
  // console.log(req.body);
});

app.listen(3000, () => console.log('hello world!'));
