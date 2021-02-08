const express = require('express');

const routes = express.Router();

const getRequest = require('./getRequest.js');

routes.get('/crush', getRequest.readCrush);

routes.get('/crush/:id', getRequest.crushID);

module.exports = routes;
