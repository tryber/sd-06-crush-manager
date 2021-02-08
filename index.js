const express = require('express');

const crushs = require('./crush.json');

const app = express();
const SUCCESS = 200;

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => res.status(200).send(crushs));

app.listen(PORT, () => console.log('funcional')); 
