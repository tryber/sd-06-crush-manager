const express = require('express');
const bodyParser = require('body-parser');//
const { readFile } = require('./utils/manageFiles');//

const app = express();
const port = 3000;//
const SUCCESS = 200;
const Success201 = 201;
const Erro404 = 404;//
const Erro400 = 400;//
const Erro401 = 401;//

app.use(bodyParser.json());//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
//

// 1 - Crie o endpoint GET /crush
app.get('/crush', async (_request, response) => {
  const crushs = await readFile();
  response.status(SUCCESS).json(crushs);
});

// 2 - Crie o endpoint GET /crush/:id
app.get('/crush/:id', async (request, response) => {
  const crushs = await readFile();
  const id = parseInt(request.params.id, 10);
  const crushId = crushs.find((crush) => crush.id === id);
  if (!crushId) response.status(Erro404).json({ message: 'Crush não encontrado' });
  response.status(SUCCESS).json(crushId);
});

// 3 - Crie o endpoint POST /login
const smsMandatoryEmail = { message: 'O campo "email" é obrigatório' };
const mandatoryEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const smsEmailNull = { message: 'O "email" deve ter o formato "email@email.com"' };
const smsMandatoryPassword = { message: 'O campo "password" é obrigatório' };
const smsPasswordNull = { message: 'A "senha" deve ter pelo menos 6 caracteres' };
const token = { token: '7mqaVRXJSp886CGr' };

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  if (!email || email === '') return response.status(Erro400).send(smsMandatoryEmail);
  if (!mandatoryEmail.test(email)) return response.status(Erro400).send(smsEmailNull);
  if (!password || password === '') return response.status(Erro400).send(smsMandatoryPassword);
  if (password.toString().length < 6) {
    return response.status(Erro400).send(smsPasswordNull);
  }
  response.status(SUCCESS).send(token);
});

// 4 - Crie o endpoint POST /crush
const newCrushRequest = (request, response, next) => {
  const { authorization } = request.headers; // authorization localizado no teste
  if (!authorization) return response.status(Erro401).json({ message: 'Token não encontrado' });
  if (authorization !== token.token) return response.status(Erro401).json({ message: 'Token inválido' });
  next();
};

app.use(newCrushRequest);

const mandatoryDate = /(\d{2})[/](\d{2})[/](\d{4})/;

const mandatoryValidation = (name, age, date) => {
  let message = '';
  if (!name) {
    message = 'O campo "name" é obrigatório';
  } else if (name.length < 3) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
  }
  if (!age) {
    message = 'O campo "age" é obrigatório';
  } else if (age < 18) {
    message = 'O crush deve ser maior de idade';
  }
  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  } else if (!mandatoryDate.test(date.datedAt)) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  } else if (date.rate % 1 !== 0 || date.rate < 1 || date.rate > 5) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return message;
};

app.post('/crush', async (request, response) => {
  const { name, age, date } = request.body;
  const messageValuation = mandatoryValidation(name, age, date);
  if (messageValuation !== '') return response.status(Erro400).json({ message: messageValuation });
  const crushes = await readFile();
  const crush = { age, date, id: crushes.length + 1, name };
  crushes.push(crush);
  response.status(Success201).send(crush);
});

// 5 - Crie o endpoint PUT /crush/:id
app.put('/crush/:id', async (request, response) => {
  const { name, age, date } = request.body;
  let { id } = request.params;
  id = parseInt(id, 10);// Recebe ID string e retorna um inteiro para passar no teste.
  const messageValuation = mandatoryValidation(name, age, date);
  if (messageValuation !== '') return response.status(Erro400).json({ message: messageValuation });
  const crushes = await readFile();
  let crush = crushes.filter((e) => e.id === id);
  crush = ({ age, date, id, name });
  response.status(SUCCESS).send(crush);
});

app.listen(port, () => console.log(`Start http://localhost:${port}`));
