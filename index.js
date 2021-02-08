const express = require('express');
const bodyParser = require('body-parser');
const { getAllCrushes } = require('./controller/getAllCrushes');
const { getCrushById } = require('./controller/getCrushById');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', getAllCrushes);
app.get('/crush/:id', getCrushById);

app.listen(3000, () => {
  console.log('WORKING UHUL');
});
