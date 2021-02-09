const express = require('express');
const { getCrushes, getCrush } = require('./middlewares');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const SUCCESS = 200;

// app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
// app.get('/crush/:id', getCrush);

app.listen(port);
