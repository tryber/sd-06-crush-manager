const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const PORT = 3000;

app.use(middlewares.logger);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', middlewares.getAll); // req 1
app.get('/crush/search', utils.auth, middlewares.searchByQuery); // req 7
app.get('/crush/:id', middlewares.getById); // req 2
app.post('/login', middlewares.login); // req 3
app.post('/crush', utils.auth, middlewares.add); // req 4
app.put('/crush/:id', utils.auth, middlewares.editById); // req 5
app.delete('/crush/:id', utils.auth, middlewares.deleteById);

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
