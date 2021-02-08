const express = require('express');
const { FrisbySpec } = require('frisby');
const fs = require('fs');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use(express.json());

app.get('/crush', (_req, res) => {
 
  const crushList = 'crush.json';

  const data = fs.readFileSync(crushList, 'utf8');
  
  res.status(200).send(data);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(port, () => console.log(`"Crush Manager" running on ${port} port!`));
