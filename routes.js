const express = require('express');

const routes = express.Router();

const getRequest = require('./getRequest');

// const postRequest = require('./postRequest');

// const putRequest = require('./putRequest');

// const deleteRequest = require('./deleteRequest');

routes.get('/crush', getRequest.readCrush);

routes.get('/crush/:id', getRequest.crushID);

// routes.post('/login', postRequest.login);

// routes.post('/crush', postRequest.add);

// routes.put('/crush/:id', putRequest.edit);

// routes.delete('/crush/:id', deleteRequest.delete);

// routes.get('/crush/search?q=searchTerm', getRequest.search);

module.exports = routes;
