const express = require('express');
const fs = require('fs');
// const crush = require('./crush.json');
const util = require('util');

const app = express();
const SUCCESS = 200;
const porta = 3000;
const chupa = util.promisify(fs.readFile);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

async function getApi() {
  const data = await chupa('crush.json');
  return JSON.parse(data);
}

app.get('/crush', async (_, res) => {
  const data = await getApi();
  res.status(200).json(data);
});
app.listen(porta, () => console.log('ON 3000!'));
