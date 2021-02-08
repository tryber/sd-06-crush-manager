const express = require('express');
const { getAllCrushs, getCrushById } = require('./getCrushs');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_req, res) => {
  res.status(SUCCESS).send();
});

app.get('/crush', getAllCrushs);

app.get('/crush/:id', getCrushById);

app.listen(3000);
