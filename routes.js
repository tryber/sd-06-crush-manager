const express = require('express');

const routes = express.Router();

const { listRoute, listRoutId } = require('./getRequire');
const { readJson, writeJson } = require('./readWrite');
const { login, createCrush } = require('./postRequire');
const { verifyEmail, verifySenha, verifyToken, verifyCrush } = require('./middlewares');

routes.get('/crush/:id', listRoutId);
routes.get('/crush', listRoute);

routes.post('/login', verifySenha, verifyEmail, login);
routes.post('/crush', verifyToken, verifyCrush, createCrush, readJson, writeJson);

module.exports = routes;
