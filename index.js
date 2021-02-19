const express = require('express');
const bodyParser = require('body-parser');
const randtoken = require('rand-token');
const crush = require('./crush.js');
// const fs = require('fs');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use('/crush', crush);

// LOGIN

const validateLogin = ({ email, password }) => {
  const emailValidate = (em) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(em).toLowerCase());
  };
  if (!email || email === '') return { message: 'O campo "email" é obrigatório' };
  if (!emailValidate(email)) return { message: 'O "email" deve ter o formato "email@email.com"' };
  if (!password || password === '') return { message: 'O campo "password" é obrigatório' };
  if (password.length < 6) return { message: 'A "senha" deve ter pelo menos 6 caracteres' };
  const token = randtoken.generate(16);
  return { token };
};

app.post('/login', (req, res) => {
  const validation = validateLogin(req.body);
  if (validation.message) return res.status(400).json(validation);
  return res.status(200).json(validation);
});

app.listen(3000);
