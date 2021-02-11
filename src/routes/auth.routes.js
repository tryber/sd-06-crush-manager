const { Router } = require('express');

const SessionController = require('../controllers/SessionController.js');

const authRoutes = Router();

const sessionController = new SessionController();

authRoutes.post('/login', sessionController.create);

module.exports = authRoutes;
