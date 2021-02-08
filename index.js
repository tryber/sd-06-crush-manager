const express = require('express');
// const { FrisbySpec } = require('frisby');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const port = 3000;
const data = fs.readFileSync('./crush.json', 'utf8');

app.use(express.json());

app.get('/crush', (req, res) => {
  if (!data) return res.status(SUCCESS).send([]);

  res.status(SUCCESS).send(data);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(port, () => console.log(`"Crush Manager" running on ${port} port!`));
