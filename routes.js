const express = require('express');

const routes = express.Router();

const getRequest = require('./getRequest');

routes.get('/crush', getRequest.readCrush);
routes.get('/crush/search', getRequest.search);
routes.get('/crush/:id', getRequest.crushID);

const postRequest = require('./postRequest');

routes.post('/login', postRequest.login);
routes.post('/crush', postRequest.addCrush);

const putRequest = require('./putRequest');

routes.put('/crush/:id', putRequest.editCrush);

const deleteRequest = require('./deleteRequest');

routes.delete('/crush/:id', deleteRequest.deleteCrush);

module.exports = routes;
