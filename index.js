const express = require('express');

const app = express();
const SUCCESS = 200;

const routes = require('./routes')



// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.all(/\//, routes)
