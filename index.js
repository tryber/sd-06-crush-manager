const express = require('express');
const routerCrush = require('./routerCrush');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/crush', routerCrush);

app.listen(3000);
