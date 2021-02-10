const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const routes = express.Router();

// LOGIN - POST
routes.post('/login', middlewares.validateLogin, controllers.login);

// CRUSH - POST
routes.post('/crush', middlewares.auth, middlewares.validateCrush, controllers.createCrush);

// CRUSH - GET
routes.get('/crush', controllers.getRequestedCrushes);

routes.get('/crush/:id', controllers.getRequestedCrushes);

routes.put('/crush/:id', middlewares.auth, middlewares.validateCrush, controllers.updateCrush);

routes.use(middlewares.handleError);

module.exports = routes;
