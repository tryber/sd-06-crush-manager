const express = require('express');
const { readFile } = require('./useful/readAndWriteFiles');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const crush = await readFile('crush');
  console.log(crush);
  return res.status(200).send(crush);
});

app.listen(3001, () => console.log('running port 3001'));
