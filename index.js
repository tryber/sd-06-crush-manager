const express = require('express');
// const { FrisbySpec } = require('frisby');
const fs = require('fs');
const { checkEmail, checkPassword, createToken } = require('./functions/login');

const app = express();
const SUCCESS = 200;

app.use(express.json());

app.get('/crush', (_req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);

  if (crushList && crushList.length > 0) return res.status(SUCCESS).send(crushList);

  if (!crushList || crushList.length === 0) return res.status(SUCCESS).send([]);
});

app.get('/crush/:id', (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const { id } = req.params;

  const crushIndex = crushList.findIndex((e) => e.id === parseInt(id, 10));

  if (crushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });

  res.status(SUCCESS).send(crushList[crushIndex]);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const emailCheck = checkEmail(email);
  const passwordCheck = checkPassword(password);

  if (emailCheck === 'null') return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (emailCheck === 'regex') return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (passwordCheck === 'null') return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (passwordCheck === 'length') return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

  const token = createToken();

  res.status(200).send({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('Crush Manager running on 3000 port!'));
