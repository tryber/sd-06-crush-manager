const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const token = { token: '7mqaVRXJSp886CGr' };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  res.json(JSON.parse(file));
});

app.get('/crush/:id', (req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  const dataFiles = JSON.parse(file);
  const { id } = req.params;
  console.log(dataFiles);
  const crush = dataFiles.filter((elemt) => elemt.id === parseInt(id, 10));
  if (crush.length !== 1) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(crush[0]);
});

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  res.status(SUCCESS).send(token);
});

app.listen(3000, () => { console.log('porta: 3000 ativa'); });
