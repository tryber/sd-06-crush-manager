const express = require('express');

const app = express();
const SUCCESS = 200;

const fs = require('fs');
const util = require('util');
const path = require('path');
// const bodyParser = require('body-parser');

const readFile = util.promisify(fs.readFile);

// app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const fileName = path.join(__dirname, 'crush.json');
  console.log(fileName);
  const data = await readFile(fileName);

  res.status(200).send(data.toString('utf-8'));
});

app.listen(3000);
