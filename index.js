const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const getAllCrush = require('./getAllCrush');
const getCrushById = require('./getCrushById');

app.get('/crush', getAllCrush);

app.get('/crush/:id', getCrushById);

app.listen('3000');
