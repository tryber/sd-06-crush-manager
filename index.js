const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const services = require('./services');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login', middleware.login, services.login);

app.get('/crush/search', async (request, response) => {
  if (!request.headers.authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }
  if (request.headers.authorization && request.headers.authorization.length !== 16) {
    return response.status(401).send({ message: 'Token inválido' });
  }

  if (!request.query.q) {
    return response.status(401).send([]);
  }

  const name = request.query.q;
  fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (err) throw new Error('Error');

    const crushs = JSON.parse(data);

    if (name.length === 0) {
      return response.status(401).send(crushs);
    }

    const filteredCrushs = crushs.filter((crush) => crush.name.includes(name));
    return response.status(SUCCESS).json(filteredCrushs);
  });
});

app.get('/crush/:id', async (request, response) => {
  const id = request.params.id - 1;

  await fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');

    if (!JSON.parse(data)[id]) {
      return response.status(404).send({ message: 'Crush não encontrado' });
    }

    return response.status(SUCCESS).send(JSON.parse(data)[id]);
  });
});

app.get('/crush', (_request, response) => {
  fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');
    return response.status(SUCCESS).send(JSON.parse(data));
  });
});

app.post('/crush', middleware.crush, services.createCrush);

app.put('/crush/:id', middleware.crush, services.editCrush);

app.delete('/crush/:id', (request, response, next) => {
  if (!request.headers.authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }
  if (request.headers.authorization && request.headers.authorization.length !== 16) {
    return response.status(401).send({ message: 'Token inválido' });
  }
  next();
}, services.deleteCrush);

app.listen(3000, () => console.log('poooorta 3000 ta on'));
