const express = require('express');
const readFile = require('./util/readFile');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  const fileData = readFile('crush.json');

  if (!fileData) {
    return response.status(200).send(fileData);
  }

  response.status(200).send(fileData);
});

app.listen(port, () => console.log('Example app listening on port 3000!'));
