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
  return JSON.parse(response);
};

const write = async (arquivo, obj) => {
  await fs.writeFile(path.resolve(path.join(__dirname, arquivo)), obj, 'utf-8');
  return true;
};

app.get('/crush', async (_request, response) => {
  const fun = await read('./crush.json');
  response.status(200).json(fun);
});

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const fun = await read('./crush.json');
  const ator = fun.find((el) => el.id === +id);
  response.status(200).json(ator);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
