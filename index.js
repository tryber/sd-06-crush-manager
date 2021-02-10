const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(express.json());

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// _______________________________________________________

// Requisito 1

const { readCrushes } = require('./src/middleware');

app.get('/crush', readCrushes);

// _______________________________________________________

// Requisito 2

const { readCrushId } = require('./src/middleware');

app.get('/crush/:id', readCrushId);

// _______________________________________________________

// Requisito 3

const { validateLogin } = require('./src/middleware');

app.post('/login', validateLogin);

// _______________________________________\________________

// Requisito 4

const { validateCrush } = require('./src/middleware');

app.post('/crush', validateCrush);

// _______________________________________________________

app.listen(3000, () => console.log('running'));
