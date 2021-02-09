const express = require('express');
const { getCrushes } = require('./middlewares');

const app = express();
const port = 3000;
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);

app.listen(port);

module.exports = {
  SUCCESS,
};
