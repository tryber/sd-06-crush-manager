const express = require('express');

const routes = express.Router();
const fs = require('fs');
const crypto = require('crypto');

const contatinhos = fs.readFileSync('./crush.json');
// vai rotear os endpoints que se quer acessar
// POST, GET, PUT, DELETE

// cria enpoint GET /crush (req1)
routes.get('/crush', (_request, response) => response.status(200).send(contatinhos));

//  cria endpoint GET /crush/:id (req2)
routes.get('/crush/:id', (request, response) => {
  const { id } = request.params;

  const listaContatinhos = JSON.parse(contatinhos);
  const neoTheChosenOne = listaContatinhos
    .filter((contatinho) => contatinho.id === parseInt(id, 10));

  if (neoTheChosenOne.length) {
    return response.status(200).json(neoTheChosenOne);
  }

  return response.status(404).json({ message: 'Crush não encontrado' });
});

// cria endpoint POST /login (req3)
routes.post('/login', (request, response) => {
  const { email, password } = request.body;

  // testar se o campo email não é passado ou é vazio:
  if (email === '' || !email) {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  // regex do AppReceitas e da Atividade de 05 fev 2021:
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  // segundo mdn [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test]
  if (!regexEmail.test(email)) {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }

  // testar se o campo password não é passado ou é vazio
  if (password === '' || !password) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  }
  // testar se o campo password não tem pelo menos 6 caracteres
  if (password.length < 6) {
    return response.status(400).send({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }

  // caso email e senha correspondam ao solicitado, gerar token
  // como visto na Atividade do dia 05 fev 2021
  const token = crypto.randomBytes(8).toString('hex');
  response.status(201).send({ token });
});

// cria endpoint POST /crush (req4)
routes.post('/crush', (request, response) => {
  const { authorization } = request.headers;
  const { name, age, date } = request.body;

  /* o authorization deve estar presente no headers e seu valor deve ser o token
  pq isso significa que a pessoa com email e senha estão logadas (eu acho) e aí
  ela tem autorização pra criar um crush. */

  // testa se existe token
  if (authorization === '' || !authorization) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  // testa se o token é válido (como o token é válido? Se tiver length === 16)
  if (authorization.length !== 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }
  // testa se o campo name não é passado ou é vazio
  if (name === '' || !name) {
    return response.status(400).send({
      message: 'O campo "name" é obrigatório',
    });
  }

  // testa se o campo name não tem pelo menso 3 caracteres
  if (name.length < 3) {
    return response.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
});

module.exports = routes;
