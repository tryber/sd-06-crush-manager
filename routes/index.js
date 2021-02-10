const express = require('express');
const middlewares = require('../middlewares');
const controllers = require('../controllers');

const routes = express.Router();

// ============== LOGIN
// POST
routes.post('/login', middlewares.validateLogin, controllers.login);

// ============== CRUSH
// GET
routes.get('/crush/search', middlewares.auth, controllers.searchCrush);
routes.get('/crush/:id', controllers.getRequestedCrushes);
routes.get('/crush', controllers.getRequestedCrushes);
// POST
routes.post('/crush', middlewares.auth, middlewares.validateCrush, controllers.createCrush);
// PUT
routes.put('/crush/:id', middlewares.auth, middlewares.validateCrush, controllers.updateCrush);
// DELETE
routes.delete('/crush/:id', middlewares.auth, controllers.deleteCrush);

routes.use(middlewares.handleError);

module.exports = routes;
