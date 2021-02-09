const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushes, getCrushById, generateLoginToken, authToken, validateCrush, createANewCrush, editCrush } = require('./middlewares');

const app = express();

const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', getAllCrushes);

// Requisito 2
app.get('/crush/:id', getCrushById);

// Requisito 3
app.post('/login', generateLoginToken);

// Requisito 4
app.post('/crush', authToken, validateCrush, createANewCrush);

// Requisito 5
app.put('/crush/:id', authToken, validateCrush, editCrush);

app.listen(3000, () => console.log('Server has been started.'));
