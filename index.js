const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// _______________________________________________________

// Requisito 1

const { readCrushes } = require('./src/middleware/readCrushes');

app.get('/crush', readCrushes);

// _______________________________________________________

// Requisito 2

const { readCrushId } = require('./src/middleware/readCrushId');

app.get('/crush/:id', readCrushId);

// _______________________________________________________

// Requisito 3

const { validateLogin } = require('./src/middleware/validateLogin');

app.post('/login', validateLogin);

// _______________________________________________________

// Requisito 4

const { validateCrush } = require('./src/middleware/validateCrush');

app.post('/crush', validateCrush);

// _______________________________________________________

app.listen(3000, () => console.log('running'));
