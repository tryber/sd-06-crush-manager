const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const crypto = require('crypto');
// module.exports = () => (crypto.randomBytes(8).toString('hex'));
const token = () => (crypto.randomBytes(8).toString('hex'));
const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');
    response.status(SUCCESS).send(JSON.parse(data));
  });
});

app.get('/crush/:id', (request, response) => {
  const id = request.params.id - 1;

  fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');

    if (!JSON.parse(data)[id]) {
      response.status(404).send({ message: 'Crush não encontrado' });
    }

    response.status(SUCCESS).send(JSON.parse(data)[id]);
  });
});

app.post('/login', (request, response, next) => {
  if (!request.body.password || request.body.password === '') {
    response.status(400).send({ "message": "O campo \"password\" é obrigatório" });
  }
  if (!request.body.email || request.body.email === '') {
    response.status(400).send({ "message": "O campo \"email\" é obrigatório" });
  }

  const { email, password } = request.body;
  const regexEmail = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;

  if (!regexEmail.test(email)) {
    response.status(400).send({ "message": "O \"email\" deve ter o formato \"email@email.com\"" });
  }
  if (String(password).length < 6) {
    response.status(400).send({ "message": "A \"senha\" deve ter pelo menos 6 caracteres" });
  }

  response.status(200).send({ "token": token() });
  next();
});

app.post('/crush', (request, response) => {
  if (!request.headers.token) {
    response.status(401).send({ "message": "Token não encontrado" });
  }
  if (request.headers.token === '') {
    response.status(401).send({ "message": "Token inválido" });
  }

  if (!request.body.name) {
    response.status(400).send({ "message": "O campo \"name\" é obrigatório" });
  }
  if (request.body.name.length < 3) {
    response.status(400).send({ "message": "O \"name\" deve ter pelo menos 3 caracteres" });
  }

  if (!request.body.age) {
    response.status(400).send({ "message": "O campo \"age\" é obrigatório" });
  }
  if (request.body.age < 18) {
    response.status(400).send({ "message": "O crush deve ser maior de idade" });
  }

  if (!request.body.date || !request.body.date.datedAt || !request.body.date.rate) {
    response.status(400).send({ "message": "O campo \"date\" é obrigatório e \"datedAt\" e \"rate\" não podem ser vazios" });
  }

  const regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  if (!regex.test(request.body.date.datedAt)) {
    response.status(400).send({ "message": "O campo \"datedAt\" deve ter o formato \"dd/mm/aaaa\"" });
  }

  if (request.body.date.rate >= 1 && request.body.date.rate <= 5) {
    response.status(201).send(request.body);
  } else {
    response.status(400).send({ "message": "O campo \"rate\" deve ser um inteiro de 1 à 5" });
  }
})


app.listen(3000, () => console.log('poooorta 3000 ta on'));
