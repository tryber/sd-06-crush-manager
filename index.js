const express = require('express');
const routerCrush = require('./routerCrush');
const login = require('./login');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', routerCrush);

app.use('/login', login);

app.listen(3000);
