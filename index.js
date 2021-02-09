const express = require('express');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

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

app.use((req, res, next) => {
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
  next();
});
app.post('/login', (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.json(token);
});

app.listen(3000, () => console.log('running'));
