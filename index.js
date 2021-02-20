const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 3000;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (err, content) => {
    if (err) return reject(err);
    resolve(JSON.parse(content));
  });
});

app.get('/crush', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  console.log(file);
  // if (file.length === 0) res.status(200).send([]);
  res.status(200).json(file);
});

// Requisito 2

app.get('/crush/:id', async (req, res) => {
  const file = await readFile(path.join(__dirname, '.', 'crush.json'));
  const { id } = req.params;
  const result = file.filter((el) => el.id === +id)[0];
  if (!result) res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).send(result);
});

// Requisito 3
app.use(bodyParser.json());

const isValid = (email, password) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  if (!email) return 'O campo "email" é obrigatório';
  if (!regexEmail) return 'O "email" deve ter o formato "email@email.com"';
  if (!password) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'A "senha" deve ter pelo menos 6 caracteres';
  return false;
};
app.post('/login', (req, res) => {
  const randomToken = crypto.randomBytes(8).toString('hex');
  // console.log(randomToken);
  const { email, password } = req.body;
  // console.log(email);
  const result = isValid(email, password);
  if (result) res.status(400).json({ message: result });
  res.status(200).json({ token: randomToken });
});

app.listen(port);
