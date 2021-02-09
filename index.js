const express = require('express');

const app = express();
const SUCCESS = 200;
const fs = require('fs');
const bodyParser = require('body-parser');
const randtoken = require('rand-token');

app.use(bodyParser.json());
const fileName = 'crush.json';

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// desafio 1
app.get('/crush', (req, res) => {
  const file = fs.readFileSync(fileName);
  if (!file) {
    return res.status(200).send([]);
  }
  return res.status(200).send(JSON.parse(file));
});

// desafio 2
app.get('/crush/:id', (req, res) => {
  const id = Number(req.params.id);
  const file = fs.readFileSync(fileName);
  const crushes = JSON.parse(file);
  let crush = null;

  if (id > 0) {
    crush = crushes.find((item) => id === item.id);
  }

  if (!crush) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(200).send(crush);
});

// desafio 3
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (!email || email === '') {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if ((password.toString()).length < 6) {
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  const token = randtoken.generate(16);
  return res.status(200).send({ token: `${token}` });
});

app.listen(3000, () => console.log('listening port 3000'));
