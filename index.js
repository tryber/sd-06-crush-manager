const express = require('express');
const fs = require('fs');

const database = fs.readFileSync('crush.json', 'utf-8');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  response.status(SUCCESS).send(JSON.parse(database));
});

app.listen(3000);
