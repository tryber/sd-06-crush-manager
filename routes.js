const express = require('express');

const routes = express.Router();
const { login } = require('./login');
const { getAllCrushes, getCrushById, addCrush } = require('./crush');

routes.get('/', (_request, response) => {
  response.status(200).send('Crush Manager - Rota /');
});

routes.post('/login', login);

routes.post('/crush', addCrush);

routes.get('/crush', getAllCrushes);

routes.get('/crush/:id', getCrushById);

module.exports = routes;
