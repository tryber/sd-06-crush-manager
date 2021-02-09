const express = require('express');
const { readFile } = require('./useful/readAndWriteFiles');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const crush = await readFile('crush');
  console.log(crush);
  return res.status(200).json(crush);
});

app.listen(port, () => console.log('running port', port));
