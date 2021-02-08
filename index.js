const express = require('express');
const { getCrushes, getCrushById } = require('./src/endpoints/gets');
const { handleLogin } = require('./src/endpoints/posts');
const { dataValidator } = require('./src/middlewares/dataValidator');

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

app.post('/login', dataValidator, handleLogin);

app.listen(PORT, () => console.log('Voando na Nimbus 3000'));
