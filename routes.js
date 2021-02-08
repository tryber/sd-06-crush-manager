const express = require('express');

const routes = express.Router();

const getRequest = require('./getRequest.js');

routes.get('/crush', getRequest.readCrush);

module.exports = routes;
