const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { readFile } = require('./utils/manageFiles');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const crushFile = await readFile();
  res.status(200).send(crushFile);
});

app.get('/crush/:id', async (req, res) => {
  const crushFile = await readFile();
  const { id } = req.params;
  const selected = crushFile.find((elem) => elem.id === parseInt(id, 10));
  if (!selected) res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(selected);
});

app.post('/login', (req, res) => {
  // validação com regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  // criação de token: https://qastack.com.br/programming/8855687/secure-random-token-in-node-js
  const { email, password } = req.body;
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email || email === '') res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!(regex.test(String(email).toLocaleLowerCase())) || !email || email === '') res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password || password === '') res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = crypto.randomBytes(8).toString('hex');
  req.body = { token };
  res.status(200).send(req.body);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('Ouvindo na porta: ', 3000));
