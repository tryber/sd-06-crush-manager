const fs = require('fs');
const express = require('express');
const crypto = require('crypto');

module.exports = () => (crypto.randomBytes(8).toString('hex'));

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_request, response) => {
  fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');
    response.status(SUCCESS).sendend(JSON.parse(data));
  });
});

app.get('/crush/:id', (request, response) => {
  const id = request.params.id - 1;

  fs.readFile('./crush.json', (err, data) => {
    if (err) throw new Error('Error');

    if (!JSON.parse(data)[id]) {
      response.status(404).send({ message: 'Crush não encontrado' });
    }

    response.status(SUCCESS).send(JSON.parse(data)[id]);
  });
});

app.post('/login', (_request, _response) => {

});

app.listen(3000);
