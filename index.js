const express = require('express');

const app = express();
const SUCCESS = 200;

const port = 3000;
const crushes = require('./crush.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());

app.get('/crushes', (_req, res) => {
  if (crushes.length > 0) {
    res.status(200).send(crushes);
  } else {
    res.status(200).send([]);
  }
});

app.listen(port, () => console.log('Running Project Crush Manager!'));
