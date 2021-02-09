const express = require('express');

const routes = express.Router();

const getRequest = require('./requests/getRequest');
// const getCrush = require('./requests/getCrush');

routes.get('/crush', getRequest.crushesRead);
// routes.get('/crush/:id', getCrush.crushRead);

module.exports = routes;
