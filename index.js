const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

const fileName = 'crush.json';

const app = express();

const SUCCESS = 200;
const DONNE = 201;
const FAILURE = 404;
const BADREQUEST = 400;
const ERROR = 401;

app.use(express.json());

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const file = await fs.readFile(fileName, 'utf-8');
  return res.status(SUCCESS).json(JSON.parse(file));
});

app.get('/crush/:id', async (req, res) => {
  const file = await fs.readFile(fileName, 'utf-8');
  const parsedJson = JSON.parse(file);
  const { id } = req.params;
  const filteredCrush = parsedJson.find((crush) => crush.id === +id);

  if (!filteredCrush) {
    return res.status(FAILURE).json({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).json(filteredCrush);
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

  if (!email || !email.length) {
    return res.status(BADREQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailTest(email)) {
    return res.status(BADREQUEST).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(BADREQUEST).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!passwordTest(password)) {
    return res.status(BADREQUEST).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = crypto.randomBytes(8).toString('hex');

  return res.json({ token });
});

app.post('/crush', async (req, res) => {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  const file = await fs.readFile(fileName, 'utf-8');
  const parsedJson = JSON.parse(file);
  const newCrush = [...parsedJson, { id: parsedJson.length + 1, ...req.body }];

  if (!authorization) {
    return res.status(ERROR).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(ERROR).json({ message: 'Token inválido' });
  }
  if (!name || name === '') {
    return res.status(BADREQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(BADREQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age || age === '') {
    return res.status(BADREQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(BADREQUEST).json({ message: 'O crush deve ser maior de idade' });
  }
  if (!date || date.datedAt === '' || !date.datedAt || date.rate === '' || !date.rate) {
    return res.status(BADREQUEST).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!regexDate.test(date.datedAt)) {
    return res.status(BADREQUEST).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(BADREQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  await fs.writeFile(fileName, JSON.stringify(newCrush));
  return res.status(DONNE).json({ id: parsedJson.length + 1, ...req.body });
});

app.put('/crush/:id', async (req, res) => {
  const { name, age, date } = req.body;
  const { authorization } = req.headers;
  const { id } = req.params;
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  const file = await fs.readFile(fileName, 'utf-8');
  const parsedJson = JSON.parse(file);

  if (!authorization) {
    return res.status(ERROR).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(ERROR).json({ message: 'Token inválido' });
  }
  if (!name || name === '') {
    return res.status(BADREQUEST).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(BADREQUEST).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age || age === '') {
    return res.status(BADREQUEST).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(BADREQUEST).json({ message: 'O crush deve ser maior de idade' });
  }
  if (!date || date.datedAt === '' || !date.datedAt || date.rate === '' || date.rate === undefined) {
    return res.status(BADREQUEST).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!regexDate.test(date.datedAt)) {
    return res.status(BADREQUEST).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(BADREQUEST).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  const edit = { id: +id, name, age, date };
  const editedCrush = [...parsedJson, edit];
  await fs.writeFile(fileName, JSON.stringify(editedCrush));
  return res.status(SUCCESS).json(edit);
});

app.delete('/crush/:id', async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  if (!authorization) {
    return res.status(ERROR).json({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(ERROR).json({ message: 'Token inválido' });
  }

  const file = await fs.readFile(fileName, 'utf-8');
  const parsedJson = JSON.parse(file);
  const newCrushAfterDelete = parsedJson.map((crush) => crush.id !== id);

  await fs.writeFile(fileName, JSON.stringify(newCrushAfterDelete));
  return res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});
