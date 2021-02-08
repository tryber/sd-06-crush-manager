const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 3000;
const crushes = require('./crush.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  if (crushes) {
    res.status(200).send(crushes);
  } else {
    res.status(200).send([]);
  }
});

app.listen(port, () => console.log('Listening on 3000...'));
