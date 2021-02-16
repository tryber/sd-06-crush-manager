const express = require('express');

const { readCrush, formatEmail, authToken, verifyCrush } = require('./services');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const BADREQUEST = 400;
const UNAUTHORIZED = 401;
const token = { token: '7mqaVRXJSp886CGr' };

app.use(express.json());
app.listen(3000, () => console.log('Executando na 3000'));

app.get('/crush', (_req, res) => {
  const fileCrush = readCrush();
  if (fileCrush < 1) {
    return res.status(SUCCESS).json([]);
  }
  return res.status(SUCCESS).send(fileCrush);
});

app.get('/crush/:id', (req, res) => {
  const fileCrush = readCrush();
  const { id } = req.params;
  const existCrushId = fileCrush.find((crush) => crush.id === parseInt(id, 10));
  console.log(existCrushId);
  if (!existCrushId) {
    return res.status(NOTFOUND).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(existCrushId);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(BADREQUEST)
      .send({ message: 'O campo "email" é obrigatório' });
  }
  if (!formatEmail(email)) {
    return res.status(BADREQUEST)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(BADREQUEST)
      .send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BADREQUEST)
      .send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(SUCCESS).send(token);
});

app.post('/crush', (req, res) => {
  app.use(authToken);
  const { name, age, date } = req.body;
  const crushList = readCrush();
  const id = crushList.length + 1;
  const authCrush = verifyCrush(name, age, date);
  console.log(authCrush);
  if (authCrush !== true) {
    return res.status(UNAUTHORIZED).send(authCrush);
  }
  crushList.push({ name, age, id, date });
  console.log(crushList);
  return res.status(SUCCESS).send(req.body);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
