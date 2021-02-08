const express = require('express');

const routes = express.Router();

const listcrushes = require('./requests/getRequest');

routes.get('/crush', listcrushes.listcrushes);

module.exports = routes;
