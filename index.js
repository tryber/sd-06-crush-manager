const express = require('express');
const getCrushes = require('./routes/requisito1');

const app = express();
const SUCCESS = 200;

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);

app.listen(3000);
