const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const routes = express.Router();

// LOGIN - POST
routes.post('/login', middlewares.validateLogin, controllers.login);

// CRUSH - POST
routes.post('/crush', middlewares.validateCrush, (req, res) => {
  console.log(req);
  res.send('/CRUSH SUCESSO: %s', req);
});

// CRUSH - GET
routes.get('/crush', controllers.getRequestedCrushes);

routes.get('/crush/:id', controllers.getRequestedCrushes);

routes.use(middlewares.handleError);

module.exports = routes;
