const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');
const { checkEmail,
  checkPassword,
  checkName,
  checkAge,
  checkDate,
} = require('./verify');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function getCrush() {
  return readFile('./crush.json', 'utf-8');
}

app.get('/crush', async (_req, res) => {
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  res.status(200).send(treatedData);
});

app.get('/crush/:id', async (req, res) => {
  const id = Number(req.params.id);
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  const user = treatedData.find((crush) => crush.id === id);
  if (!user) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(user);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!checkEmail(email)) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (!checkPassword(password)) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).send({ token });
});

const validateToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const validateCrush = (req, res, next) => {
  const { name, age, date } = req.body;

  if (!name || name === '') return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!checkName(name)) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (!age || age === '') return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (!checkAge(age)) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!date || date === '' || !date.datedAt || !date.rate) {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!checkDate(date.datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (Number(date.rate) < 1 || (Number(date.rate) > 5)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

app.post('/crush', validateToken, validateCrush, async (req, res) => {
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  const newCrush = { id: treatedData.length + 1, ...req.body };
  treatedData.push(newCrush);
  await writeFile('./crush.json', JSON.stringify(treatedData));
  res.status(201).send(newCrush);
});

app.put('/crush/:id', validateToken, validateCrush, async (req, res) => {
  const id = Number(req.params.id);

  const data = await getCrush();
  const treatedData = JSON.parse(data);
  const result = treatedData.filter((crush) => crush.id !== id);
  const editedCrush = { id, ...req.body };
  result.push(editedCrush);
  await writeFile('./crush.json', JSON.stringify(result));

  res.status(200).send(editedCrush);
});

app.delete('/crush/:id', validateToken, async (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  const result = treatedData.filter((crush) => crush.id !== id);
  await writeFile('./crush.json', JSON.stringify(result));
  res.status(200).send({ message: 'Crush deletado com sucesso' });
});

app.get('/crush/search', validateToken, async (req, res) => {
  const data = await getCrush();
  const treatedData = JSON.parse(data);
  console.log(treatedData);

  if (!req.query.q || req.query.q === '') return res.status(200).send(treatedData);
  const result = treatedData.filter((crush) => crush.name.includes(req.query.q));
  res.status(200).send(result);
});

app.listen(3000, () => console.log('servidor online porta 3000'));
