const express = require('express');
// const { FrisbySpec } = require('frisby');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const data = fs.readFileSync('./crush.json', 'utf8');

app.get('/crush', (_req, res) => {
  const crushList = JSON.parse(data);

  if (!crushList) return res.status(SUCCESS).send([]);

  res.status(SUCCESS).send(crushList);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log(`'Crush Manager' running on 3000 port!`));
