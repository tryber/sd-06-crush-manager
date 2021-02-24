const express = require('express');

const routes = express.Router();
const { login } = require('./login');
const { tokenValidation, crushInfoValidation, getAllCrushes, getCrushById, addCrush, editCrush, deleteCrush } = require('./crush');

routes.get('/', (_request, response) => {
  response.status(200).send('Crush Manager - Rota /');
});

routes.get('/crush/:id', getCrushById);

routes.get('/crush', getAllCrushes);

routes.post('/login', login);

routes.post('/crush', tokenValidation, crushInfoValidation, addCrush);

routes.put('/crush/:id', tokenValidation, crushInfoValidation, editCrush);

routes.delete('/crush/:id', tokenValidation, deleteCrush);

module.exports = routes;
