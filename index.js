const express = require('express');

const { getData, getDataById } = require('./services/getCrush');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use((express.json()));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getData);
app.get('/crush/:id', getDataById);

app.listen(port, () => console.log(`Aplicação executando na porta: ${port}!`));
