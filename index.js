const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const read = async (arquivo) => {
  const response = await fs.readFile(path.resolve(path.join(__dirname, arquivo)), 'utf-8');
  console.log(response);
  return response;
};

app.get('/crush', async (_request, response) => {
  const fun = await read('./crush.json');
  response.status(200).send(fun);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
