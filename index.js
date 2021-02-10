const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const {
  checkEmail,
  checkPasswordCont,
  createToken,
  verifyToken,
  checkCrushName,
  checkCrushNameLength,
  checkAgeCrush,
  checkAgeOlder,
  formatDate,
  checkRate,
  checkDateRate,
  getNextId,
} = require('./validations.js');

const app = express();
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const fileName = path.join(__dirname, 'crush.json');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Ler os dados do arquivo
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
    return res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).json(crushSelected);
});

// Desafio 03 - endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!checkEmail(email)) {
    return res.status(BAD_REQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password.toString() === '') {
    return res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!checkPasswordCont(password)) {
    return res.status(BAD_REQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = createToken();
  res.status(SUCCESS).json({ token });
});

// Desafio 04 - endpoint POST /crush
app.post('/crush', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  console.log('Authorization: ', authorization);
  if (!authorization || authorization === '') {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (!verifyToken(authorization)) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  if (!checkCrushName(name)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (!checkCrushNameLength(name)) {
    return res.status(BAD_REQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!checkAgeCrush(age)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!checkAgeOlder(age)) {
    return res.status(BAD_REQUEST).json({ message: 'O crush deve ser maior de idade' });
  }
  if (!checkDateRate(date.datedAt, date.rate)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!formatDate(date.datedAt)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!checkRate(date.rate)) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const crushes = await getData();
  const id = getNextId(crushes);
  const newCrush = { name, age, id, date };
  setData(crushes, newCrush);
  res.status(CREATED).json(newCrush);
});

app.listen(3000);
