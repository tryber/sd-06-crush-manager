const express = require('express');

const routes = express.Router();
const { login } = require('./login');
const { getAllCrushes, getCrushById, addCrush, editCrush, deleteCrush } = require('./crush');

routes.get('/', (_request, response) => {
  response.status(200).send('Crush Manager - Rota /');
});

routes.get('/crush/:id', getCrushById);

routes.get('/crush', getAllCrushes);

routes.post('/login', login);

routes.post('/crush', addCrush);

routes.put('/crush/:id', editCrush);

routes.delete('/crush/:id', deleteCrush);

module.exports = routes;
