const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const { getAllCrush } = require('./getAllCrushes');
const { getCrushById } = require('./getCrushById');
const { login } = require('./getToken');
const { checkToken } = require('./services');
const { validateCrush } = require('./validateCrush');
const { createCrush } = require('./createCrush');
const { editCrush } = require('./editCrush');
const { deleteCrush } = require('./deleteCrush');

app.post('/login', login);

app.get('/crush', getAllCrush);

app.get('/crush/:id', getCrushById);

app.post('/crush', checkToken, validateCrush, createCrush);

app.put('/crush/:id', checkToken, validateCrush, editCrush);

app.delete('/crush/:id', checkToken, deleteCrush);

app.listen(3000);
