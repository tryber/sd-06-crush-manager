const express = require('express');

const routes = express.Router();
const { getAllCrushes, getCrushById } = require('./crush');

routes.get('/', (_request, response) => {
  response.status(200).send('Crush Manager - Rota /');
});

routes.get('/crush', getAllCrushes);

routes.get('/crush/:id', getCrushById);

module.exports = routes;
