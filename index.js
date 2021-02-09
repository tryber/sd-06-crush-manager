const express = require('express');
const fs = require('fs');

const port = 3000;
const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const NFmessage = { message: 'Crush não encontrado' };
const auth = { token: '7mqaVRXJSp886CGr' };
const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const regexDate = /(\d{2})[/](\d{2})[/](\d{4})/;

function getCrushes() {
  return JSON.parse(fs.readFileSync('./crush.json', 'utf8'));
}

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  res.status(SUCCESS).send(getCrushes());
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crush = getCrushes().find((e) => e.id === parseInt(id, 10));
  if (!crush) return res.status(NOTFOUND).send(NFmessage);
  res.status(SUCCESS).send(crush);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(SUCCESS).send(auth);
});

const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== auth.token) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

app.use(authorize);

const validate = (name, age, date) => {
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
  } else if (!regexDate.test(date.datedAt)) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  } else if (date.rate !== 1
    && date.rate !== 2 && date.rate !== 3 && date.rate !== 4 && date.rate !== 5) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return message;
};

app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
  const message = validate(name, age, date);
  if (message !== '') {
    return res.status(400).json({ message });
  }
  const crushes = getCrushes();
  const crush = { age, date, id: crushes.length + 1, name };
  crushes.push(crush);
  res.status(201).send(crush);
});

app.put('/crush/:id', (req, res) => {
  const { name, age, date } = req.body;
  let { id } = req.params;
  id = parseInt(id, 10);
  const message = validate(name, age, date);
  if (message !== '') {
    return res.status(400).json({ message });
  }
  const crushes = getCrushes();
  let crush = crushes.filter((e) => e.id === id);
  crush = ({ age, date, id, name });
  res.status(200).send(crush);
});

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}!`));
