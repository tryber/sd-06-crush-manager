const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const SUCCESS = 200;
const PORT = 3000;
const verifyCrushes = require('./middlewares/verifyCrushes');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  res.status(SUCCESS).send(verifyCrushes);
  console.log('teste');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
