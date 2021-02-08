const express = require('express');
const readFile = require('./util/readFile');
const tokenGenerator = require('./util/tokenGenerator');

const app = express();
app.use(express.json());
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// challenge 1
app.get('/crush', (_request, response) => {
  const fileData = readFile('crush.json');

  if (!fileData) {
    return response.status(200).send(fileData);
  }

  response.status(200).send(fileData);
});

// challenge 2
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const fileData = readFile('crush.json');
  const chosenCrush = fileData.find((crush) => crush.id === parseInt(id, 10));

  if (!chosenCrush) {
    return response.status(404).send({ message: 'Crush não encontrado' });
  }

  response.status(200).send(chosenCrush);
});

// challenge 3
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  const token = tokenGenerator();
  const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email || email.length === 0) {
    return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailValidator.test(String(email).toLowerCase())) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password || password.length === 0) {
    return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  if (password && password.length < 6) {
    return response.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  response.status(200).send({ token });
});

app.listen(port, () => console.log('Example app listening on port 3000!'));
