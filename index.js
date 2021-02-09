const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const path = require('path').resolve;

const app = express();
const port = 3000;
const SUCCESS = 200;

app.use(bodyParser.json());
// app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const data = await fs.readFile(`${path()}/crush.json`, 'utf-8');
  const allCrushes = JSON.parse(data);
  res.status(SUCCESS).send(allCrushes);
});

app.listen(port);
