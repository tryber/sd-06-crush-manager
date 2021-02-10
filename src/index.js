const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());
app.listen(3000, () => console.log('running'));
const { readFile } = require('./utils/manageFiles');
const { emailValid, passwordValid } = require('./utils/validations');

// ------- Requisito 1 --------

app.get('/crush', async (_request, response) => {
  const crushes = await readFile('crush');

  try {
    response.status(200).json(JSON.parse(crushes));
  } catch (error) {
    console.log(error);
    response.status(200).json([]);
  }
});

// ------- Requisito 2 --------

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const myCrushes = await readFile('crush');
  const element = JSON.parse(myCrushes).find((e) => e.id === parseInt(id, 10));

  if (element) {
    response.status(200).json(element);
  } else {
    response.status(404).json({ message: 'Crush não encontrado' });
  }
});

// ------- Requisito 3 --------

app.post('/login', async (request, response) => {
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = request.body;

  if (email === '' || !email) response.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (password === '' || !password) response.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (emailValid(email)) response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  if (passwordValid(email)) response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  return response.status(200).json({ token });
});
