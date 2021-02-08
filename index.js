const express = require('express');
const bodyParser = require('body-parser');
const { emptyCrushes } = require('./middlewares');

const app = express();

const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1

app.get('/crush', emptyCrushes);

app.listen(3000, () => console.log('Server has been started'));
