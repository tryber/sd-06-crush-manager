const express = require('express');
const { getCrushes, getCrushById, getLogin } = require('./src/endpoints/gets');
// const { postLogin } = require('./src/endpoints/posts');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushes);
app.get('/crush/:id', getCrushById);
app.get('/login', getLogin);

app.listen(PORT, () => console.log('Voando na Nimbus 3000'));
