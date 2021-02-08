const express = require('express');
const getCrushes = require('./routes/requisito1');
const crushById = require('./routes/requisito2');

const app = express();
const SUCCESS = 200;

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
app.get('/crush/:id', crushById);

app.listen(3000);
