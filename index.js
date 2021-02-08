const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const crushes = fs.readFileSync('./crush.json');
  if (crushes.length > 0) {
    res.status(200).send(JSON.parse(crushes));
  } else {
    res.status(200).send([]);
  }
});

app.listen(port, () => console.log('Listening on 3000...'));
