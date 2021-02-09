const express = require('express');
const { readerFile } = require('./utils/managerFiles');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 400;
const PORT = 3000;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const notFoundCrush = { message: 'Crush não encontrado' };
const requiredEmail = { message: 'O campo "email" é obrigatório' };
const emailInvalid = { message: 'O "email" deve ter o formato "email@email.com"' };
const requiredPassword = { message: 'O campo "password" é obrigatório' };
const invalidPassword = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
const token = { token: '7mqaVRXJSp886CGr' };

// quero que todas as requisições devolvam um json
app.use(express.json()); // aqui já incorporou as funções do body-parse

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', async (_request, response) => {
  const crushes = await readerFile();
  response.status(SUCCESS).send(crushes);
});

// Requisito 2
app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const crushes = await readerFile();
  const crush = JSON.parse(crushes).find((element) => element.id === parseInt(id, 10));
  if (!crush) return response.status(NOTFOUND).send(notFoundCrush);
  response.status(SUCCESS).send(crush);
});

// Requisito 3
app.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (!email || email === '') return response.status(NOTFOUND).send(requiredEmail);
  if (!regexEmail.test(email)) return response.status(NOTFOUND).send(emailInvalid);
  if (!password || password === '') return response.status(NOTFOUND).send(requiredPassword);
  if (password.length < 6) return response.status(NOTFOUND).send(invalidPassword);
  response.status(SUCCESS).send(token);
});

app.listen(PORT, () => console.log(`Em execução ${PORT}`));
