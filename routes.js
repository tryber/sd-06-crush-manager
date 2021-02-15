const express = require('express');

const routes = express.Router();
const { getAllCrushes } = require('./crush');

routes.get('/', (_request, response) => {
  response.status(200).send('Crush Manager - Rota /');
});

routes.get('/crush', getAllCrushes);

module.exports = routes;
