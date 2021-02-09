const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const { createToken, validateLogin, validateToken,
  validateCrush, getNextId } = require('./functions');

const app = express();
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const fileName = path.join(__dirname, 'crush.json');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Ler dos dados do arquivo
const getData = async () => {
  const data = await readFile(fileName);
  return JSON.parse(data);
};

// Salvar os dados no arquivo
const setData = async (crushes, newCrush) => {
  const newArrayCrushes = [...crushes, newCrush];
  const newArrayCrushesFormated = JSON.stringify(newArrayCrushes, null, '\t');
  await writeFile(fileName, newArrayCrushesFormated, 'utf-8');
};

// endpoint GET /crush - Requirement 01
app.get('/crush', async (req, res) => {
  const crushes = await getData();
  res.status(SUCCESS).send(crushes);
});

// endpoint GET /crush/:id - Requirement 02
app.get('/crush/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushes = await getData();
  const crushSelected = crushes.find((crush) => crush.id === id);

  if (!crushSelected) {
    return res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).json(crushSelected);
});

// endpoint POST /login - Requirement 03
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const validationLogin = validateLogin(email, password);
  if (validationLogin !== 'OK') {
    return res.status(BAD_REQUEST).json({ message: validationLogin });
  }
  const token = createToken();
  res.status(SUCCESS).json({ token });
});

// endpoint POST /crush - Requirement 04
app.post('/crush', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;

  const validToken = validateToken(authorization);
  if (validToken !== 'OK') {
    return res.status(UNAUTHORIZED).json({ message: validToken });
  }
  const validCrush = validateCrush(name, age, date);
  if (validCrush !== 'OK') {
    return res.status(BAD_REQUEST).json({ message: validCrush });
  }

  const crushes = await getData();
  const id = getNextId(crushes);
  const newCrush = { name, age, id, date };
  setData(crushes, newCrush);

  res.status(CREATED).json(newCrush);
});

app.listen(3000, () => console.log('Crush Magager Started: Port 3000'));
