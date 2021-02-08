const express = require('express');

const routes = express.Router();

const getRequest = require('./requests/getRequest');

routes.get('/crush', getRequest.crushRead);

module.exports = routes;
