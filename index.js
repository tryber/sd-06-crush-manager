const express = require('express');
// const data = require('./crush.json');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use('/', routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});

app.listen(3000, () => console.log('executando'));
