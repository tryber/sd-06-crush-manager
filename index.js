const express = require('express');

const app = express();
const SUCCESS = 200;

const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');

const readFile = util.promisify(fs.readFile);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

// Get Method - Requirement 01
app.get('/crush', async (req, res) => {
  const fileName = path.join(__dirname, 'crush.json');
  const dataCrush = await readFile(fileName);

  res.status(200).send(JSON.parse(dataCrush));
});

app.listen(3000);
