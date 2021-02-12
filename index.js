const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushes, getCrush } = require('./middlewares');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getAllCrushes);
app.get('/crush/:id', getCrush);

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
