const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const { createToken, validateLogin } = require('./functions');

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
app.get('/crush/:id', async (req, res) => {
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

  const validationLogin = validateLogin(email, password);
  if (validationLogin !== 'OK') {
    return res.status(400).json({ message: validationLogin });
  }
  const token = createToken();
  res.status(200).json({ token });
});

// endpoint POST /crush - Requirement 04
app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;

  const { token } = req.headers;
  res.status(201).json({ token, name, age, date });
});

app.listen(3000);
