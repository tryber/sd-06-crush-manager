const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { generateToken, validateEmail } = require('./functions');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  fs.readFile('./crush.json', (err, data) => {
    res.status(200).send(JSON.parse(data.toString()));
  });
});

app.get('/crush/:id', (req, res) => {
  fs.readFile('./crush.json', (err, data) => {
    const { id } = req.params;
    const crushID = parseInt(id, 10);
    const dataJSON = JSON.parse(data);
    const index = dataJSON.findIndex((person) => person.id === crushID);

    if (index === -1) return res.status(404).send({ message: 'Crush não encontrado' });

    res.status(200).send(dataJSON[index]);
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || email === '') return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (validateEmail(email)) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (!password || password === '') return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.toString().length < 6) return res.status(400).send({ message: 'O "senha" ter pelo menos 6 caracteres' });

  const token = generateToken();
  res.send({ token });
});

app.listen(port);
