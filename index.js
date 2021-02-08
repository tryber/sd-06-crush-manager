const express = require('express');
const crush = require('./crush.json');//

const app = express();
const SUCCESS = 200;

const port = 3001;//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
//
app.get('/crush', (_request, response) => {
  if (crush.length > 0) {
    response.status(SUCCESS).send(crush);
  } else {
    response.status(SUCCESS).send([]);
  }
});

app.listen(port);
