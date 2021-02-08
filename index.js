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
  const crushes = JSON.parse(fs.readFileSync('./crush.json'));
  if (crushes.length > 0) {
    res.status(200).send(crushes);
  } else {
    console.log([]);
    res.status(200).send([]);
  }
});

app.get('/crush/:id', (req, res) => {
  const crushes = JSON.parse(fs.readFileSync('./crush.json'));
  const crush = crushes.find((c) => c.id === parseInt(req.params.id, 10));
  if (!crush) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(crush);
});

app.listen(port, () => console.log('Listening on 3000...'));
