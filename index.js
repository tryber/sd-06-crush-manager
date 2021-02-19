const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const path = require('path');
const crypto = require('crypto-random-string');

const dataCrush = path.resolve(__dirname, 'crush.json');

// Errors and port name
const SUCCESS = 200;
const BADREQUEST = 400;
const NOTFOUND = 404;
const INTERNALERROR = 500;
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Don't remove this endpoint, and for the evaluator to work
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

// midlewares error
app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(INTERNALERROR).json({ message: 'Internal Error' });
});

// Challenge 1 - getAllCrush
app.get('/crush', rescue(async (_req, res, _next) => {
  const crushs = await readFile(dataCrush);
  res.status(SUCCESS).json(JSON.parse(crushs));
}));

// Challenge 2 - getCrushById
app.get('/crush/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const crushs = await readFile(dataCrush);
  const arrayData = JSON.parse(crushs);
  const crushId = arrayData.find((obj) => obj.id === parseInt(id, 10));

  if (!crushId) return res.status(NOTFOUND).json({ message: 'Crush não encontrado' });

  return res.status(SUCCESS).json(crushId);
}));

// Challenge 3 - login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const authentication = crypto({ length: 16, type: 'hex' });
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) { return res.status(BADREQUEST).json({ message: 'O campo "email" é obrigatório' }); }
  if (!emailRegex.test(email.toLowerCase())) return res.status(BADREQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(BADREQUEST).json({ message: 'O campo "password" é obrigatório' });
  if ((password.toString().length < 6)) return res.status(BADREQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  res.status(SUCCESS).json({ token: authentication });
});

// Listen to port 3000
app.listen(PORT);
