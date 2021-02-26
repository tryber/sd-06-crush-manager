const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

const port = 3000;

const app = express();

const SUCCESS = 200;

const crushFile = 'crush.json';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const crushes = await fs.readFile(crushFile);
  if (!crushes) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(crushes));
});
app.get('/crush/:id', async (req, res) => {
  const crushes = await fs.readFile(crushFile, 'utf-8');
  const file = JSON.parse(crushes);
  const { id } = req.params;
  const findCrush = file.find((crush) => crush.id === +id);
  if (!findCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(findCrush);
});
const emailValidation = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return regex.test(email);
};
const passwordValidation = (password) => {
  const toString = password.toString();
  return toString.length;
};
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (emailValidation(email) === false) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (passwordValidation(password) < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  return res.json({ token });
});
app.post('/crush', async (req, res) => {
  const crushes = await fs.readFile(crushFile, 'utf-8');
  const file = JSON.parse(crushes);
  const lastID = file[file.length - 1].id;
  const addCrush = { ...req.body, id: lastID + 1 };
  const { name, age, date } = addCrush;
  const { auth } = req.headers;
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!auth) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (auth.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (date === undefined || !date || date.datedAt === '' || date.datedAt === undefined || date.rate === '' || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (regexDate.test(date.datedAt) === false) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  file.push(addCrush);
  await fs.writeFile(crushFile, JSON.stringify(file));
  return res.status(201).json(addCrush);
});

app.put('/crush/:id', async (req, res) => {
  const crushes = await fs.readFile(crushFile, 'utf-8');
  let file = JSON.parse(crushes);
  const { id } = req.params;
  const { name, age, date } = req.body;
  const { auth } = req.headers;
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

  if (!auth) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (auth.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'O crush deve ser maior de idade' });
  }
  if (date === undefined || !date || date.datedAt === '' || date.datedAt === undefined || date.rate === '' || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (regexDate.test(date.datedAt) === false) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const newCrush = { name, age, date, id: +id };
  file = file.map((crush) => (crush.id === +id ? newCrush : crush));
  await fs.writeFile(crushFile, JSON.stringify(file));
  return res.status(200).json(newCrush);
});

app.listen(port, () => console.log('listening on port 3000'));
