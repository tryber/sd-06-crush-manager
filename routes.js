const express = require('express');

const routes = express.Router();

const { listRoute, listRoutId } = require('./getRequire');

routes.get('/crush', listRoute);
routes.get('/crush/:id', listRoutId);

module.exports = routes;
