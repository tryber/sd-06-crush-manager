const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// recomendado para parsear os dados vindos do body.
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// _______________________________________________________

// Requisito 1 - retorna todos os dados dos crushes com o método GET.

const { readCrushes } = require('./src/middleware');

app.get('/crush', readCrushes);

// _______________________________________________________

// Requisito 2 - retorna todos os dados de um crush pelo ID com o método GET.

const { readCrushId } = require('./src/middleware');

app.get('/crush/:id', readCrushId);

// _______________________________________________________

// Requisito 3 - valida o acesso com email e password e gera um token com o método POST.

const { validateLogin } = require('./src/middleware');

app.post('/login', validateLogin);

// _______________________________________\________________

// Requisito 4 - // adiciona um novo crush ao array de crushes com o método POST.

const { validateCrush } = require('./src/middleware');

app.post('/crush', validateCrush);

// _______________________________________________________

// Requisito 5 - edita um crush existente no array de crushes com o método PUT.

const { editCrush } = require('./src/middleware');

app.put('/crush/:id', editCrush);

// _______________________________________________________

// Requisito 6 - deleta um crush existente no array de crushes com o método DELETE.

const { deleteCrush } = require('./src/middleware');

app.delete('/crush/:id', deleteCrush);

// _______________________________________________________

// ouvindo a porta 3000
app.listen(3000, () => console.log('running'));
