const express = require('express');

const routes = express.Router();

// vai rotear os endpoints que se quer acessar
// POST, GRET, PUT, DELETE
routes.get('/');

module.exports = routes;
