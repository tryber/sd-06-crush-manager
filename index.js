const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;
const SUCCESS = 200;

app.use(express.json());

// const readFilePromise = util.promisify(fs.readFile);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_request, response) => {
  const crush = await fs.readFile('./crush.json', 'utf-8');
  console.log(crush);
  response.status(SUCCESS).send(crush);
});

app.listen(port);
