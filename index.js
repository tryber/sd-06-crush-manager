const express = require('express');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requisito 1

const { readFile, writeFile } = require('./src/utils/manageFile');

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
  console.log(crushes);
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

app.post('/crush', async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  const { name, age, date } = req.body;
  console.log(date);

  if (!name) {
    res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  if (!age) {
    res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age <= 18) {
    res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  if (!date) {
    res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  console.log(date.datedAt);
  if (dataValidate(date.datedAt)) {
    res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!Number.isInteger(date.rate) || date.rate > 5 || date.rate < 1) {
    res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  const crushes = await readFile('crush');
  const newCrush = await JSON.parse(crushes);
  const id = newCrush.length + 1;
  const element = { name, age, id, date };
  await newCrush.push(element);
  await writeFile('crush', JSON.stringify(newCrush));
  await res.status(201).send(element);
});

app.listen(3000, () => console.log('running'));
