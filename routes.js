const express = require('express');

const routes = express.Router();
const { login } = require('./login');
const { getAllCrushes, getCrushById, addCrush, editCrush } = require('./crush');


routes.get('/', (_request, response) => {
  response.status(200).send('Crush Manager - Rota /');
});

routes.post('/login', login);

routes.put('/crush/:id', editCrush);

routes.get('/crush/:id', getCrushById);

routes.post('/crush', addCrush);

routes.get('/crush', getAllCrushes);

module.exports = routes;
