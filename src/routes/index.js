const { Router } = require('express');

const crushRoutes = require('./crush.routes.js');
const authRoutes = require('./auth.routes.js');

const appRoutes = Router();

const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
appRoutes.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

appRoutes.use('/crush', crushRoutes);
appRoutes.use(authRoutes);

module.exports = appRoutes;
