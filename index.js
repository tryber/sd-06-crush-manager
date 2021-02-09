const express = require('express');
const path = require('path');
const fs = require('fs').promises;
// const data = require('./crush.json');

const app = express();
const crush = path.join(__dirname, './crush.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});
async function readJson() {
  const readData = await fs.readFile(crush);
  const parseData = JSON.parse(readData);
  return parseData;
}
//  Crie o endpoint GET `/crush`
app.get('/crush', async (request, response) => {
  const data = await readJson();
  console.log(' data ', data);
  response.status(200).send(data);
});

// Crie o endepoint GET `/crush/id`
app.get('/crush/:id', (request, response) => {
  response.send(crush);
});

readJson();

app.listen(3000, () => console.log('executando'));
