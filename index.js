const { response } = require('express');
const express = require('express');
const crushJson = require('./crush.json');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});


app.get('/crush', (req, res) => {
  res.statusCode === 200 ? res.send(crushJson) : [];
});


app.listen(3000, () => {
  console.log('ouvindo a porta 3001');
});