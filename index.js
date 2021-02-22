const express = require('express');
const crushs = require('./crush.json');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// functions
const verifyEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript#46181
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const verifyPassword = (password) => String(password).length >= 6;

app.use(express.json());

// req1
app.get('/crush', (req, res) => res.status(SUCCESS).json(crushs));

// req2
app.get('/crush/:id', (req, res) => {
  const { id } = req.params;

  const crush = crushs.find((e) => e.id === +id);

  if (crush) {
    return res.status(SUCCESS).json(crush);
  }

  return res.status(404).json({ message: 'Crush não encontrado' });
});

app.post('/login', (req, res) => {
  const characters = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const stringToken = 'xxxxxxxxxxxxxxxx';
  const sToken = stringToken.split('')
    .reduce((st, _c) => st.replace('x', characters.charAt(Math.floor(Math.random() * characters.length))), stringToken);

  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (email && !verifyEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password && !verifyPassword(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres"' });
  }

  return res.status(SUCCESS).json({ token: sToken });
});

app.listen(3000);
