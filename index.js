const express = require('express');
const { getChrushes, getCrushById } = require('./src/endpoints/gets');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getChrushes);
app.get('/crush/:id', getCrushById);

app.listen(PORT, () => console.log('Voando na Nimbus 3000'));
