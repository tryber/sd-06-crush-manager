const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const NOT_FOUND = 404;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const file = fs.readFileSync('./crush.json', 'utf8');
  res.json(JSON.parse(file));
});

// async app.get('/crush/:id', (req, res) => {
//   const file = await fs.readFile('./crush.json', 'utf8');
//   const dataFiles = JSON.parse(file);
//   const { id } = req.params;
//   const crush = dataFiles.filter((elemt) => {
//     elemt.id === id;
//   });
//   if(!crush) res.status(NOT_FOUND);
//   res.status(SUCCESS).send(crush)
// });

app.listen(3000, () => { console.log('porta: 3000 ativa'); });
