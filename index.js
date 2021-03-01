const express = require('express');
const routes = require('./routes');

const app = express();
const port = 3000;
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
