const express = require('express');
const { getCrushes, getCrushById } = require('./src/endpoints/gets');
const { handleLogin, addCrush } = require('./src/endpoints/posts');
const { editCrush } = require('./src/endpoints/puts');
const { loginValidator, addCrushValidator } = require('./src/middlewares/dataValidator');
const { tokenAuthenticator } = require('./src/middlewares/tokenAuthenticator');

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

app.post('/login', loginValidator, handleLogin);
app.post('/crush', tokenAuthenticator, addCrushValidator, addCrush);

app.put('/crush/:id', tokenAuthenticator, addCrushValidator, editCrush);

app.listen(PORT, () => console.log('Voando na Nimbus 3000'));
