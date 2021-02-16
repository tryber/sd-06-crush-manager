const express = require('express');

const routes = express.Router();
const fs = require('fs');

// vai rotear os endpoints que se quer acessar
// POST, GET, PUT, DELETE
routes.get('/crush', (_request, response) => response.status(200).send(contatinhos));

  }

  return response.status(200).send(contatinhos);
});

module.exports = routes;
