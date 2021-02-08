const express = require('express');
const fs = require('fs');

const port = 3000;
const app = express();
const SUCCESS = 200;
const NOTFOUND = 404;
const NFmessage = { message: 'Crush não encontrado' };

let crushes = fs.readFileSync('./crush.json', 'utf8');
crushes = JSON.parse(crushes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  res.status(SUCCESS).send(crushes);
});

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;
  const crush = crushes.find((e) => e.id === parseInt(id, 10));
  if (!crush) return res.status(NOTFOUND).send(NFmessage);
  res.status(SUCCESS).send(crush);
});

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}!`));
