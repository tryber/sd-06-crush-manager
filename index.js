const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const crypto = require('crypto-random-string');
const path = require('path');

const dataCrush = path.resolve(__dirname, 'crush.json');

const SUCCESS = 200;
const CREATED = 201;
const BADREQUEST = 400;
const UNAUTHORIZED = 401;
const NOTFOUND = 404;
const INTERNALERROR = 500;
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// ReadFile

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, content) => {
      if (err) return reject(new Error(err));
      resolve(content);
    });
  });
}

// WriteFile
function writingFile(fileName, crush) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, crush, (err) => {
      if (err) return reject(new Error(err));
      resolve(crush);
    });
  });
}

// Challenge 1

app.get('/crush', rescue(async (_req, res, _next) => {
  const crushs = await readFile(dataCrush);

  res.status(SUCCESS).json(JSON.parse(crushs));
}));

// Challenge 2

app.get('/crush/:id', rescue(async (req, res) => {
  const { id } = req.params;

  const crushs = await readFile(dataCrush);
  const arrayData = JSON.parse(crushs);
  const crushId = arrayData.find((obj) => obj.id === parseInt(id, 10));
  if (!crushId) return res.status(NOTFOUND).json({ message: 'Crush não encontrado' });
  return res.status(SUCCESS).json(crushId);
}));

// Challenge 3

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const authentication = crypto({ length: 16, type: 'hex' });
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email.toLowerCase())) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.toString().length < 6) {
    return res
      .status(BADREQUEST)
      .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  res.status(SUCCESS).json({ token: authentication });
});

// Challenge 4

app.post('/crush', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;

  const crushs = await readFile(dataCrush);
  const arrayData = JSON.parse(crushs);

  const newCrush = { name, age, id: arrayData.length + 1, date };

  const regexDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    res
      .status(BADREQUEST)
      .json({ message: 'O crush deve ser maior de idade' });
  }
  if (
    date === undefined
      || date.datedAt === undefined
      || date.rate === undefined
  ) {
    return res.status(BADREQUEST).json({
      message:
          'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date && !regexDate.test(date.datedAt)) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  arrayData.push(newCrush);

  await writingFile(dataCrush, JSON.stringify(arrayData));

  return res.status(CREATED).json(newCrush);
}));

// Challenge 5

app.put('/crush/:id', rescue(async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const { id } = req.params;

  const crushs = await readFile(dataCrush);
  const arrayData = JSON.parse(crushs);

  const regexDate = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    res
      .status(BADREQUEST)
      .json({ message: 'O crush deve ser maior de idade' });
  }
  if (
    date === undefined
      || date.datedAt === undefined
      || date.rate === undefined
  ) {
    return res.status(BADREQUEST).json({
      message:
          'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date && !regexDate.test(date.datedAt)) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res
      .status(BADREQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const dataEdit = { name, age, id: Number(id), date };

  const editCrush = arrayData.map((crush) =>
    (crush.id === dataEdit.id ? dataEdit : crush));

  await writingFile(dataCrush, JSON.stringify(editCrush));

  return res.status(SUCCESS).json(dataEdit);
}));

// midlewares error

app.use((err, _req, res, _next) => {
  console.error(err.message);

  res.status(INTERNALERROR).json({ message: 'Internal Error' });
});

app.listen(PORT, () => console.log(`Rodando servidor na porta: ${PORT}`));
