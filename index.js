const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 5000;
const { getCrush } = require('./getRequest');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.get('/crush', getCrush);

app.listen(port, () => console.log(`Executando na porta ${port}`));
