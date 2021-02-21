const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// REQ-1
app.get('/crush', (_req, res) => {
  const crushFile = fs.readFileSync(path.join(__dirname, 'crush.json'), 'utf-8');
  if (!crushFile) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(crushFile));
});

// REQ-2
app.get('/crush/:id', (req, res) => {
  const crushFile = fs.readFileSync(path.join(__dirname, 'crush.json'), 'utf-8');
  const { id } = req.params;
  const getCrush = JSON.parse(crushFile).find((crush) => crush.id === Number(id));
  if (!getCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(getCrush);
});

// REQ-3
const tokenAuthentication = { authorization: '7mqaVRXJSp886CGr' };
const validPassword = (password) => password.toLowercase().toString();
const validEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!validEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório' });
  }

  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório' });
  }

  if (validPassword(password).length < 6) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token: tokenAuthentication.authorization });
});

app.listen(3000, () => console.log('rodando'));
