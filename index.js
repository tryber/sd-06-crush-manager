const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const util = require('util');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

const readFile = util.promisify(fs.readFile);

function getCrush() {
  return readFile('./crush.json', 'utf-8');
}

app.get('/crush', async (_req, res) => {
  const data = await getCrush();
  res.status(200).send(data);
});

app.listen(3000, () => console.log('servidor online porta 3000'));
