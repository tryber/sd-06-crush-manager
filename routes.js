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
  console.log(request.body);
  response.status(201).send('tudo ok');
});

module.exports = routes;
