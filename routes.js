const express = require('express');

const routes = express.Router();
const fs = require('fs');

const contatinhos = fs.readFileSync('./crush.json');
// vai rotear os endpoints que se quer acessar
// POST, GET, PUT, DELETE
routes.get('/crush', (_request, response) => response.status(200).send(contatinhos));

// Requisito 2 -> GET /crush/:id

routes.get('/crush/:id', (request, response) => {
  const { id } = request.params;

  const listaContatinhos = JSON.parse(contatinhos);
  const neo = listaContatinhos.filter((contatinho) => contatinho.id === parseInt(id, 10));

  if (neo.length) {
    return response.status(200).json(neo);
  }

  return response.status(404).json({ message: 'Crush não encontrado' });
});

// Requisito 3 -> /login
routes.post('/login', (request, response) => {
  const { email, password } = request.body;

  // testar se o campo email não é passado ou é vazio:
  if (email === '' || !email) {
    return response.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  }
  // regex do AppReceitas e da Atividade de 5 fev 2021:
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  // segundo mdn [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test]
  if (!regexEmail.test(email)) {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  response.status(201).send('tudo ok');
});

module.exports = routes;
