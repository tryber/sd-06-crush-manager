const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send('Olá mundo');
});

app.get('/crush', (_req, res) => {
  res.status(SUCCESS).send('rota crush');
});

app.listen(port, () => console.log('Example app listening on port port!'));
