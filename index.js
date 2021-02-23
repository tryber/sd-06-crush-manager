const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(200).send();
});
// app.use((request, response, next) => {
//   console.log({ date: new Date(), method: request.method, endpoint: request.originalUrl });
//   next();
// });
app.use('/', routes);

app.listen(3000, () => console.log('executando'));
