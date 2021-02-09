const express = require('express');
const routes = require('./routes');

const app = express();
app.use(routes);

const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send('Olá mundo');
});

app.listen(port, () => console.log('Example app listening on port port!'));
