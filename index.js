const express = require('express');
// const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  const data = await readFile('./crush.json', 'utf8');
  response.status(SUCCESS).send(JSON.parse(data));
});

app.listen(3000);
