const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const controllers = require('./controllers');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login', middleware.login, controllers.login);

app.get('/crush/:id', async (request, response) => {
  const id = request.params.id - 1;

  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');

    if (!JSON.parse(data)[id]) {
      response.status(404).send({ message: 'Crush não encontrado' });
    }

    response.status(SUCCESS).send(JSON.parse(data)[id]);
  });
});

app.get('/crush', async (_request, response) => {
  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');
    response.status(SUCCESS).send(JSON.parse(data));
  });
});

app.post('/crush', middleware.auth, controllers.createCrush);

app.put('/crush/:id', middleware.auth, controllers.editCrush);

app.delete('/crush/:id', (request, response, next) => {
  if (!request.headers.authorization) {
    response.status(401).send({ message: 'Token não encontrado' });
  }
  if (request.headers.authorization.length !== 16) {
    response.status(401).send({ message: 'Token inválido' });
  }
  next();
}, controllers.deleteCrush);

app.listen(3000, () => console.log('poooorta 3000 ta on'));
