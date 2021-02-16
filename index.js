const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const port = 3000;
const token = crypto.randomBytes(8).toString('hex');

app.use(bodyParser.json());

async function getCrushes() {
  const data = await fs.readFile('./crush.json');
  return JSON.parse(data);
}

async function checkEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/i;
  return emailRegex.test(email);
}

async function checkPass(pass) {
  if (!pass || pass.toString().length < 6) return false;
  return true;
}

function authenticate(request, response, next) {
  const { authorization } = request.headers;
  const msgs = {
    noToken: 'Token não encontrado',
    invalidToken: 'Token inválido',
  };

  if (!authorization) return response.status(401).json(msgs.noToken);
  if (authorization && authorization.length != 16) return response.status(401).json(msgs.invalidToken);

  next();
}

function checkNewCrush(request, response, next) {
  const msgs = {
    noName: 'O campo "name" é obrigatório',
    noAge: 'O campo "age" é obrigatório',
    noDate:
      'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    invalidName: 'O "name" deve ter pelo menos 3 caracteres',
    invalidAge: 'O crush deve ser maior de idade',
    invalidDated: 'O campo "datedAt" deve ter o formato "dd/mm/aaa"',
    invalidRate: 'O campo "rate" deve ser um inteiro de 1 à 5',
  };

  const {
    name,
    age,
    date,
  } = request.body;

  // const regEx = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
  const validDate = moment(date.datedAt, 'DD/MM/YYYY', true).isValid();

  if (!name) return response.status(400).json(msgs.noName);
  if (!age) return response.status(400).json(msgs.noAge);
  if (!date || !date.datedAt || !date.rate) return response.status(400).json(msgs.noDate);
  if (name.length < 3) return response.status(400).json(msgs.invalidName);
  if (age < 18) return response.status(400).json(msgs.invalidAge);
  if (!validDate) return response.status(400).json(msgs.invalidDated);
  if (date.rate < 1 || date.rate > 5) return response.status(400).json(msgs.invalidRate);

  next();
}

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  const crushes = await getCrushes();
  response.status(SUCCESS).json(crushes);
});

app.get('/crush/:id', async (request, response) => {
  const crushes = await getCrushes();
  const msg = { message: 'Crush não encontrado' };
  const { id } = request.params;
  const match = crushes.find((crush) => crush.id === +id);

  if (match) return response.status(SUCCESS).json(match);
  response.status(404).json(msg);
});

app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  console.log(email, password);
  const validEmail = await checkEmail(email);
  const validPass = await checkPass(password);
  const msgs = {
    noEmail: { message: 'O campo "email" é obrigatório' },
    invalidEmail: { message: 'O "email" deve ter o formato "email@email.com"' },
    noPassword: { message: 'O campo "password" é obrigatório' },
    invalidPassword: { message: 'A "senha" deve ter pelo menos 6 caracteres' },
  };

  if (validEmail && validPass) return response.status(SUCCESS).json({ token });
  if (!email) return response.status(400).json(msgs.noEmail);
  if (!password) return response.status(400).json(msgs.noPassword);
  if (!validPass) return response.status(400).json(msgs.invalidPassword);
  if (!validEmail) return response.status(400).json(msgs.invalidEmail);
});

app.post('/crush', authenticate, checkNewCrush, async (request, response) => {
  // const { name, date, age } = request.body;
  const data = await getCrushes();
  const newCrush = { ...request.body };
  data.push(newCrush);
  fs.writeFileSync('./crush.json', data);
  response.status(201).json(data);
});

app.listen(port, () => console.log(`Listening to port ${port}!`));
