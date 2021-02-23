const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const SUCCESS = 200;
// app.use(express.json()); mesma funcionalidade que o bodyParser
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// readFile
const read = async () => {
  const crush = await fs.readFile('./crush.json', 'utf-8');
  // console.log(crush);
  return JSON.parse(crush);
};
// read();
// req 1 rota crush
app.get('/crush', async (_req, res) => {
  try {
    const crushes = await read();
    res.status(200).send(crushes);
  } catch (error) {
    // console.error(error.message);
    res.status(200).json([]);
  }
});

// req 2
app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crushList = await read();
  // '+' antes de id, funciona como o parseInt
  const paramsId = crushList.filter((crush) => crush.id === +id);
  if (paramsId.length) {
    return res.status(200).json(paramsId[0]);
  }
  return res.status(404).json({ message: 'Crush não encontrado' });
});

// req 3
app.post('/login', (req, res) => {
  // geração de token, conforme atividade(formato hexadecimal, size/2)
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = req.body;
  // console.log(email, password);
  if (!email || email === '') {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  // validate email
  const rgxEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!rgxEmail.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  if (!password || password === '') {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }

  const rgxPassword = /^\d{6,}$/gm;
  if (!rgxPassword.test(password)) {
    return res.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token });
});

// req4
app.post('/crush', (req, res) => {
  const newCrush = req.body;
  const crushList = read();
  const newList = crushList.push(newCrush);
  res.status(200).json(newList);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Executando na ${port}`);
});
