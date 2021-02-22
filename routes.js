const express = require('express');

const routes = express.Router();

const { listRoute, listRoutId } = require('./getRequire');
const { login, createCrush, editCrushes, deleteCrush, searchCrush } = require('./postRequire');
const { verifyToken, verifyCrush, verifySenha, verifyEmail } = require('./middlewares');

routes.get('/crush/search?q=searchTerm', verifyToken, searchCrush);
routes.get('/crush/:id', listRoutId);
routes.get('/crush', listRoute);

routes.post('/login', verifySenha, verifyEmail, login);
routes.post('/crush', verifyToken, verifyCrush, createCrush);
routes.put('/crush/:id', verifyToken, verifyCrush, editCrushes);
routes.delete('/crush/:id', verifyToken, deleteCrush);

module.exports = routes;
