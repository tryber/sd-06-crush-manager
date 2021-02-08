const express = require('express');
const crush = require('./crush.json');

const app = express();
const SUCCESS = 200;
const porta = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_, res) => {
  if (crush.length > 0) {
    return res.status(200).json(crush);
  }
  return res.status(200).json([]);
});

app.listen(porta, () => console.log('ON na Porta 3000!'));
