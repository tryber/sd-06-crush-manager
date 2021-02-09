const express = require('express');
const fs = require('fs').promises;
// const routes = require('./routes');

const app = express();
const readFilePromise = fs.readFile;
// app.use(routes);

const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send('Olá mundo');
});

app.get('/crush', async (_req, res) => {
  const file = 'crush.json';

  readFilePromise(file)
    .then((content) => res.status(200).send(JSON.parse(content)))
    .catch((error) => console.log(error));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
