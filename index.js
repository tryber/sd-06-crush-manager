const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const { checkEmail, checkPasswordCont, createToken, verifyToken } = require('./validations.js');

const app = express();
const SUCCESS = 200;

const readFile = util.promisify(fs.readFile);

const getData = async () => {
  const fileName = path.join(__dirname, 'crush.json');
  const data = await readFile(fileName);
  return JSON.parse(data);
};

app.use(bodyParser.json());

// Desafio 01 - endpoint GET /crush
app.get('/crush', async (req, res) => {
  const crushes = await getData();
  res.status(200).send(crushes);
});

// Desafio 02 - endpoint GET /crush/:id
app.get('/crush/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushes = await getData();
  const crushSelected = crushes.find((crush) => crush.id === id);
  if (!crushSelected) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).json(crushSelected);
});

// Desafio 03 - endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password.toString() === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!checkPasswordCont(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = createToken();
  res.status(200).json({ token });
});

// Desafio 04 - endpoint POST /crush
const posts = {
  name: 'Keanu Reeves',
  age: 56,
  date: {
    datedAt: '22/10/2019',
    rate: 5,
  },
};

app.post('/crush', (req, res) => {
  const { authorization: token } = req.header;
  if (!token || token === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!verifyToken(token)) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  res.send('POST request to the homepage');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000);
