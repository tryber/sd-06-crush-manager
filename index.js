const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  res.json(JSON.parse(file));
});

app.get('/crush/:id', (req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  const dataFiles = JSON.parse(file);
  const { id } = req.params;
  console.log(dataFiles);
  const crush = dataFiles.filter((elemt) => elemt.id === parseInt(id, 10));
  if (crush.length !== 1) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  return res.status(SUCCESS).send(crush[0]);
});

app.listen(3000, () => { console.log('porta: 3000 ativa'); });
