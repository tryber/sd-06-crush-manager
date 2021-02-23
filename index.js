const express = require('express');

const { readCrush, formatEmail, authToken, validateCrush } = require('./services');

const app = express();
const token = { token: '7mqaVRXJSp886CGr' };
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const crushList = readCrush();
  if (crushList < 1) {
    return res.status(NOT_FOUND).send(crushList);
  }
  return res.status(SUCCESS).send(crushList);
});

app.get('/crush/:id', (req, res) => {
  const crushList = readCrush();
  const { id } = req.params;
  const existCrushId = crushList.find((crush) => crush.id === parseInt(id, 10));
  if (!existCrushId) {
    return res.status(NOT_FOUND).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(existCrushId);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(BAD_REQUEST)
      .send({ message: 'O campo "email" é obrigatório' });
  }
  if (!formatEmail(email)) {
    return res.status(BAD_REQUEST)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(BAD_REQUEST)
      .send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQUEST)
      .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).send(token);
});

app.use(authToken);

app.post('/crush', (req, res) => {
  const crushList = readCrush();
  const { name, age, date } = req.body;
  const id = crushList.length + 1;
  const authCrush = validateCrush(name, age, date);
  if (authCrush !== true) {
    return res.status(BAD_REQUEST).send(authCrush);
  }
  const newCrush = { name, age, id, date };
  crushList.push(newCrush);
  return res.status(CREATED).send(newCrush);
});

app.put('/crush/:id', (req, res) => {
  const crushList = readCrush();
  const { id } = req.params;
  const { name, age, date } = req.body;
  const authCrush = validateCrush(name, age, date);
  if (authCrush !== true) {
    return res.status(BAD_REQUEST).send(authCrush);
  }
  const crushIndex = crushList.findIndex((crush) => crush.id === parseInt(id, 10));
  crushList[crushIndex] = { ...crushList[crushIndex], name, id: parseInt(id, 10), age, date };
  return res.status(SUCCESS).send(crushList[crushIndex]);
});

app.delete('/crush/:id', (req, res) => {
  const crushList = readCrush();
  const { id } = req.params;
  const crushIndex = crushList.findIndex((crush) => crush.id === parseInt(id, 10));
  crushList.splice(crushIndex, 1);
  return res.status(SUCCESS)
    .send({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => console.log('Executando na 3000'));
