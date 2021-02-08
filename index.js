const express = require('express');
// const { FrisbySpec } = require('frisby');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

app.get('/crush', (_req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);

  if (crushList && crushList.length > 0) return res.status(SUCCESS).send(crushList);

  if (!crushList || crushList.length === 0) return res.status(SUCCESS).send([]);
});

app.get('/crush/:id', (req, res) => {
  const data = fs.readFileSync('./crush.json', 'utf8');
  const crushList = JSON.parse(data);
  const { id } = req.params;

  const crushIndex = crushList.findIndex((e) => e.id === parseInt(id, 10));

  if (crushIndex === -1) return res.status(404).send({ message: 'Crush não encontrado' });

  res.status(SUCCESS).send(crushList[crushIndex]);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => console.log('Crush Manager running on 3000 port!'));
