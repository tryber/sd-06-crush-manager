const { request } = require('express');
const express = require('express');

const app = express();
const SUCCESS = 200;
const data = require('./crushs');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  await response.status(200).send(data);
});

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const messsage = {
    "message": "Crush não encontrado"
  }
  if(!data[id-1]) {
    return response.status(404).json(messsage)
  }
  await response.status(200).send(data[id-1]);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
