const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const NOTFOUND = 400;
const PORT = 3000;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexDate = /(\d{2})[/](\d{2})[/](\d{4})/;
const notFoundCrush = { message: 'Crush não encontrado' };
const requiredEmail = { message: 'O campo "email" é obrigatório' };
const emailInvalid = { message: 'O "email" deve ter o formato "email@email.com"' };
const requiredPassword = { message: 'O campo "password" é obrigatório' };
const invalidPassword = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
const token = { token: '7mqaVRXJSp886CGr' };

const readerFile = () => {
  // path.resolve traz resolução de caminhos
  const file = JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
  return file;
};

// quero que todas as requisições devolvam um json
app.use(express.json()); // aqui já incorporou as funções do body-parse

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', (_request, response) => {
  const crushes = readerFile();
  response.status(SUCCESS).send(crushes);
});

// Requisito 2
app.get('/crush/:id', (request, response) => {
  const { id } = request.params;
  const crushes = readerFile();
  const crush = crushes.find((element) => element.id === parseInt(id, 10));
  if (!crush) return response.status(404).send(notFoundCrush);
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

// Requisito 4
const released = (request, response, next) => {
  const { release } = request.headers;
  if (!release) return response.status(401).send({ message: 'Token não encontrado' });
  if (release !== token.token) return response.status(401).send({ message: 'Token inválido' });
  next();
};

app.use(released);

const validationInfo = (name, age, date) => {
  let message = '';
  if (!name) message = 'O campo "name" é obrigatório';
  if (name.length < 3) message = 'O "name" deve ter pelo menos 3 caracteres';
  if (!age) message = 'O campo "name" é obrigatório';
  if (age < 18) message = 'O crush deve ser maior de idade';
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0))message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  if (!regexDate.test(date.datedAt)) message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  if (date.rate % 1 !== 0 || date.rate < 1 || date.rate > 5) message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  return message;
};

app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
  const message = validationInfo(name, age, date);
  if (message !== '') return res.status(400).json({ message });
  const crushes = readerFile();
  const crush = { age, date, id: crushes.length + 1, name };
  crushes.push(crush);
  res.status(201).send(crush);
});

app.listen(PORT, () => console.log(`Em execução ${PORT}`));
