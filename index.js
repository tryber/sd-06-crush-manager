const express = require('express');
// const fs = require('fs');
const bodyParser = require('body-parser');
const { getAllCrushes } = require('./middlewares/getAllCrushes');
const { getCrushById } = require('./middlewares/getCrushById');
const { login } = require('./middlewares/login');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', getAllCrushes);

app.get('/crush/:id', getCrushById);

app.post('/login', login);

app.listen(3000);
