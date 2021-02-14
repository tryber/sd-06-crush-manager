const express = require('express');

const routes = express.Router();

// importa as funções das requisições
const listarUsuarios = require('./requests/getRequest');

// vai rotear os endpoints que se quer acessar
// POST, GRET, PUT, DELETE
routes.get('/', listarUsuarios.listarTodosUsuarios);

module.exports = routes;
