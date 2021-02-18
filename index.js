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
  const auth = request.headers.authorization;
  const msgs = {
    noToken: { message: 'Token não encontrado' },
    invalidToken: { message: 'Token inválido' },
  };

  if (!auth) return response.status(401).json(msgs.noToken);
  if (auth && auth.length !== 16) return response.status(401).json(msgs.invalidToken);

  next();
}

function checkNewCrush(request, response, next) {
  const msgs = {
    noName: { message: 'O campo "name" é obrigatório' },
    noAge: { message: 'O campo "age" é obrigatório' },
    noDate: {
      message:
        'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    },
    invalidName: { message: 'O "name" deve ter pelo menos 3 caracteres' },
    invalidAge: { message: 'O crush deve ser maior de idade' },
    invalidDated: {
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    },
    invalidRate: { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
  };

  const { name, age, date } = request.body;

  const regEx = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  const validDate = date && regEx.test(date.datedAt);

  if (!name) return response.status(400).json(msgs.noName);
  if (!age) return response.status(400).json(msgs.noAge);
  if (date && (date.rate < 1 || date.rate > 5)) return response.status(400).json(msgs.invalidRate);
  if (!date || !date.datedAt || !date.rate) return response.status(400).json(msgs.noDate);
  if (name.length < 3) return response.status(400).json(msgs.invalidName);
  if (age < 18) return response.status(400).json(msgs.invalidAge);
  if (!validDate) return response.status(400).json(msgs.invalidDated);

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
  const validEmail = await checkEmail(email);
  const validPass = await checkPass(password);
  request.body = { token };
  const msgs = {
    noEmail: { message: 'O campo "email" é obrigatório' },
    invalidEmail: { message: 'O "email" deve ter o formato "email@email.com"' },
    noPassword: { message: 'O campo "password" é obrigatório' },
    invalidPassword: { message: 'A "senha" deve ter pelo menos 6 caracteres' },
  };

  if (validEmail && validPass) return response.status(SUCCESS).json(request.body);
  if (!email) return response.status(400).json(msgs.noEmail);
  if (!password) return response.status(400).json(msgs.noPassword);
  if (!validPass) return response.status(400).json(msgs.invalidPassword);
  if (!validEmail) return response.status(400).json(msgs.invalidEmail);
});

app.post('/crush', authenticate, checkNewCrush, async (request, response) => {
  try {
    const data = await getCrushes();
    const ids = await data.map((crush) => crush.id);
    const maxId = await ids[ids.length - 1];
    const newCrush = { ...request.body };
    newCrush.id = maxId + 1;
    data.push(newCrush);
    fs.writeFile('./crush.json', JSON.stringify(data));
    response.status(201).json(newCrush);
  } catch (error) {
    throw new Error(error);
  }
});

app.put('/crush/:id', authenticate, checkNewCrush, async (request, response) => {
  try {
    const data = await getCrushes();
    const { id } = request.params;
    const newCrush = { ...request.body };
    newCrush.id = +id;
    const oldCrushIndex = data.findIndex((crush) => crush.id === +id);
    data[oldCrushIndex] = newCrush;
    fs.writeFile('./crush.json', JSON.stringify(data));
    response.status(200).json(newCrush);
  } catch (error) {
    throw new Error(error);
  }
});

app.delete('/crush/:id', authenticate, async (request, response) => {
  try {
    const data = await getCrushes();
    const { id } = request.params;
    const crushIndex = data.findIndex((crush) => crush.id === +id);
    const newData = data.slice(crushIndex, 1);
    fs.writeFile('./crush.json', JSON.stringify(newData));
    response.status(200).json({ message: 'Crush deletado com sucesso' });
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => console.log(`Listening to port ${port}!`));
