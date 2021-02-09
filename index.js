const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

const fileName = 'crush.json';

const app = express();

const SUCCESS = 200;
const FAILURE = 404;
const BADREQUEST = 400;

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const file = await fs.readFile(fileName, 'utf-8');
  return res.status(SUCCESS).send(JSON.parse(file));
});

app.get('/crush/:id', async (req, res) => {
  const file = await fs.readFile(fileName, 'utf-8');
  const parsedJson = JSON.parse(file);
  const { id } = req.params;
  const filteredCrush = parsedJson.find((crush) => crush.id === +id);

  if (!filteredCrush) {
    return res.status(FAILURE).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(filteredCrush);
});

const emailTest = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return regex.test(email);
};

const passwordTest = (passWord) => {
  const toString = passWord.toString();
  return (toString.length >= 6) || false;
};

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const testEmail = emailTest(email);
  const testPassword = passwordTest(password);

  if (!email || !email.length) {
    return res.status(BADREQUEST).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!testEmail) {
    return res.status(BADREQUEST).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(BADREQUEST).send({ message: 'O campo "password" é obrigatório' });
  }
  if (!testPassword) {
    return res.status(BADREQUEST).send({ message: 'O "password" ter pelo menos 6 caracteres' });
  }

  const token = crypto.randomBytes(8).toString('hex');

  return res.json({ token });
});
