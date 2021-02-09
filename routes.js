const express = require('express');

const routes = express.Router();

const getRequest = require('./getRequest');

const postRequest = require('./postRequest');

routes.get('/crush', getRequest.readCrush);

routes.get('/crush/:id', getRequest.crushID);

routes.post('/login', postRequest.login);

routes.post('/crush', postRequest.add);

module.exports = routes;
