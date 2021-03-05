const express = require('express');

const routes = express.Router();

const getRequest = require('./getRequest.js');
const postRequest = require('./postRequest.js');
const putRequest = require('./putRequest.js');
const deleteRequest = require('./deleteRequest.js');

// get
routes.get('/crush', getRequest.readCrush);
routes.get('/crush/search', getRequest.search);
routes.get('/crush/:id', getRequest.crushID);

// post
routes.post('/login', postRequest.login);
routes.post('/crush', postRequest.addCrush);

// delete
routes.delete('/crush/:id', deleteRequest.deleteCrush);

// put
routes.put('/crush/:id', putRequest.editCrush);

module.exports = routes;
