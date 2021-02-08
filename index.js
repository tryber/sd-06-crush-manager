const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const { checkEmail, checkPassword, createToken } = require('./functions');

const app = express();
const SUCCESS = 200;
const readFile = util.promisify(fs.readFile);

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Ler arquivo com os dados
const getData = async () => {
  const fileName = path.join(__dirname, 'crush.json');
  const data = await readFile(fileName);
  return JSON.parse(data);
};

// endpoint GET /crush - Requirement 01
app.get('/crush', async (req, res) => {
  const crushes = await getData();
  res.status(200).send(crushes);
});

// endpoint GET /crush/:id - Requirement 02
app.get('/login', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushes = await getData();
  const crushSelected = crushes.find((crush) => crush.id === id);

  if (!crushSelected) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(crushSelected);
});

// endpoint POST /login - Requirement 03
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com' });
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!checkPassword(password)) {
    return res.status(400).json({ message: 'O "password" ter pelo menos 6 caracteres' });
  }
  const token = createToken();
  res.status(200).json({ token });
});

app.listen(3000);
