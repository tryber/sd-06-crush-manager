const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const tokenAuthorization = require('./tokenAuthorization');
const crushValidation = require('./crushValidation');

const app = express();
const SUCCESS = 200;
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
const token = { token: '7mqaVRXJSp886CGr' };

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get(/\/crush\/search/, tokenAuthorization, (req, res) => {
  const { q } = req.query;
  const regex = new RegExp(q);
  console.log('qualquer coisa');
  // data: dd/mm/aaaa regex(\d{1,2}/\d{2}/(\d{2}|(\d{4}))); \d ->digito; numero
  const crushesFile = fs.readFileSync('./crush.json', 'utf8');
  const crushes = JSON.parse(crushesFile);
  const matchCrush = crushes.filter((crush) => regex.test(crush.name));
  res.status(SUCCESS).json(matchCrush);
});

app.get('/crush/:id', (req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  const dataFiles = JSON.parse(file);
  const { id } = req.params;
  const crushes = dataFiles.filter((crush) => crush.id === parseInt(id, 10));
  if (crushes.length !== 1) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(crushes[0]);
});

app.get('/crush', (_req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  res.json(JSON.parse(file));
});

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
  res.status(SUCCESS).json(token);
});

app.use(tokenAuthorization);

app.post('/crush', (req, res) => {
  const { name, age, date } = req.body;
  const invalidCrush = crushValidation(name, age, date);
  if (invalidCrush) {
    return res.status(400).json({ message: invalidCrush });
  }
  const crushesFile = fs.readFileSync('./crush.json', 'utf8');
  const crushes = JSON.parse(crushesFile);
  const newCrush = { name, age, id: crushes.length + 1, date };
  crushes.push(newCrush);
  fs.writeFileSync('./crush.json', JSON.stringify(crushes), 'utf8');
  res.status(201).json(newCrush);
});

app.put('/crush/:id', (req, res) => {
  const { name, age, date } = req.body;
  const invalidCrush = crushValidation(name, age, date);
  if (invalidCrush) {
    return res.status(400).json({ message: invalidCrush });
  }
  const { id } = req.params;
  const crushesFile = fs.readFileSync('./crush.json', 'utf8');
  const crushes = JSON.parse(crushesFile);
  const crushId = crushes.filter((crush) => crush.id === parseInt(id, 10));
  const editCrush = { name, age, id: parseInt(id, 10), date };
  crushes.splice(crushId, 1, editCrush);
  fs.writeFileSync('./crush.json', JSON.stringify(crushes), 'utf8');
  res.status(SUCCESS).json(editCrush);
});

app.delete('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crushesFile = fs.readFileSync('./crush.json', 'utf8');
  const crushes = JSON.parse(crushesFile);
  const crushId = crushes.filter((crush) => crush.id === parseInt(id, 10));
  crushes.splice(crushId, 1);
  fs.writeFileSync('./crush.json', JSON.stringify(crushes), 'utf8');
  res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

app.listen(3000, () => { console.log('porta: 3000 ativa'); });
