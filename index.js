const express = require('express');
const { getCrushes, getCrushById, getBySearchTerm } = require('./src/endpoints/gets');
const { handleLogin, addCrush } = require('./src/endpoints/posts');
const { editCrush } = require('./src/endpoints/puts');
const { deleteCrush } = require('./src/endpoints/deletes');
const { loginValidator, alterCrushValidator } = require('./src/middlewares/dataValidator');
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
app.get('/crush/search', tokenAuthenticator, getBySearchTerm);

app.post('/login', loginValidator, handleLogin);
app.post('/crush', tokenAuthenticator, alterCrushValidator, addCrush);

app.put('/crush/:id', tokenAuthenticator, alterCrushValidator, editCrush);

app.delete('/crush/:id', tokenAuthenticator, deleteCrush);

app.listen(PORT, () => console.log('Voando na Nimbus 3000'));
