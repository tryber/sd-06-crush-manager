const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requisito 1

const { readFile } = require('./src/utils/manageFile');

app.get('/crush', async (_req, res) => {
  const crushes = await readFile('crush');
  try {
    res.status(200).json(JSON.parse(crushes));
  } catch (e) {
    console.error(e);
    res.status(200).json([]);
  }
});

// requisito 2
app.get('/crush/:id', async (req, res) => {
  const crushes = await readFile('crush');
  const id = parseInt(req.params.id, 10);
  const element = JSON.parse(crushes).find((e) => e.id === id);

  if (element) {
    res.status(200).json(element);
  } else {
    res.status(404).send({ message: 'Crush não encontrado' });
  }
});

// requisito 3

const { emailValidate, passwordValidate } = require('./src/utils/validate');

app.use(express.json());

const validation = ((req, res) => {
  const { email, password } = req.body;
  if (emailValidate(email)) {
    if (!email) {
      res.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
    } else {
      res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
  }

  if (passwordValidate(password)) {
    if (!password) {
      res.status(400).json({
        message: 'O campo "password" é obrigatório',
      });
    } else {
      res.status(400).json({
        message: 'A "senha" deve ter pelo menos 6 caracteres',
      });
    }
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.post('/login', validation);

// requisito 4

const { dataValidate } = require('./src/utils/validate');

const { writeFile } = require('./src/utils/manageFile');

app.post('/crush', async (req, res) => {
  const token = req.headers.authorization;
  const { name, age, date } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 4) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (dataValidate(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  const crushes = await readFile('crush');
  const newCrush = JSON.parse(crushes);
  const id = newCrush.length + 1;
  const element = { name, age, id, date };
  newCrush.push(element);
  writeFile('crush', JSON.stringify(newCrush));
  return res.status(201).send(element);
});

// requisito 5

app.put('/crush/:id', async (req, res) => {
  const crushes = await readFile('crush');
  const token = req.headers.authorization;
  const { name, age, date } = req.body;
  const id = parseInt(req.params.id, 10);

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 4) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (dataValidate(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  const crushesArray = JSON.parse(crushes);
  const element = crushesArray.find((e) => e.id === id);

  if (element) {
    const elementIndex = crushesArray.findIndex((e) => e.id === id);
    element.name = name;
    element.age = age;
    element.date.datedAt = date.datedAt;
    element.date.rate = date.rate;
    crushesArray.splice(elementIndex, 1, element);
    writeFile('crush', JSON.stringify(crushesArray));
    return res.status(200).json(element);
  }
  return res.status(404).send({ message: 'Crush não encontrado' });
});

// reqiosito 6

app.delete('/crush/:id', async (req, res) => {
  const crushes = await readFile('crush');
  const token = req.headers.authorization;
  const id = parseInt(req.params.id, 10);

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const crushesArray = JSON.parse(crushes);
  const element = crushesArray.find((e) => e.id === id);

  if (element) {
    const elementIndex = crushesArray.findIndex((e) => e.id === id);
    crushesArray.splice(elementIndex, 1);
    writeFile('crush', JSON.stringify(crushesArray));
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  }
  return res.status(404).send({ message: 'Crush não encontrado' });
});

app.listen(3000, () => console.log('running'));
