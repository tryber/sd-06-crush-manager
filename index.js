const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// Necessário para o avaliador
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', async (_req, res) => {
  const file = await fs.readFile('crush.json');
  if (!file) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(file));
});

// Requisito 2
app.get('/crush/:id', async (req, res) => {
  const file = await fs.readFile('crush.json');
  const { id } = req.params;
  const getCrush = JSON.parse(file).find((crush) => crush.id === Number(id));
  if (!getCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(getCrush);
});

const validateEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
const validatePassword = (password) => password.toLowerCase().toString();

// Requisito 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (validatePassword(password).length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  const token = () => crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: token() });
});

// Requisito 4
const validateDate = (data) => /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(data);

app.post('/crush', async (req, res) => {
  const { token } = req.headers;

  const file = await fs.readFile('crush.json');
  const fileJSON = JSON.parse(file);

  const newID = file.length + 1;
  const newCrush = { ...req.body, id: newID };
  const { name, age, date } = newCrush;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
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
  if (!date || date.datedAt === '' || date.rate === '' || date === undefined || date.datedAt === undefined || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!validateDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  fileJSON.push(newCrush);

  await fs.writeFile('crush.json', JSON.stringify(fileJSON));
  return res.status(201).json(newCrush);
});

// Requisito 5
app.put('/crush/:id', async (req, res) => {
  const { token } = req.headers;
  const file = await fs.readFile('crush.json');
  const fileJSON = JSON.parse(file);

  const { id } = req.params;
  const { name, age, date } = req.body;
  const newCrush = { name, age, date, id: Number(id) };

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
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
  if (!date || date.datedAt === '' || date.rate === '' || date === undefined || date.datedAt === undefined || date.rate === undefined) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!validateDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate < 1 || date.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  const newFile = fileJSON.map((addedCrush) => {
    if (addedCrush.id === newCrush.id) {
      return newCrush;
    }
    return addedCrush;
  });

  await fs.writeFile('crush.json', JSON.stringify(newFile));
  return res.status(200).json(newCrush);
});

// Requisito 6
app.delete('/crush/:id', async (req, res) => {
  const { token } = req.headers;
  const { id } = req.params;
  const file = await fs.readFile('crush.json');
  const fileJSON = JSON.parse(file);

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const newFile = fileJSON.filter((crush) => crush.id !== Number(id));
  await fs.writeFile('crush.json', JSON.stringify(newFile));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => console.log('Ouvindo a porta 3000...'));
