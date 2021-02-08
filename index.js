const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;
const SUCCESS = 200;

app.use(express.json());

let crush;

fs.readFile('./crush.json', 'utf-8', (err, data) => {
  if (err) throw err;
  crush = data;
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  response.status(SUCCESS).send(crush);
});

app.listen(port);
