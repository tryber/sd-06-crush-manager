const express = require('express');
// const bodyParser = require('body-parser');
const readFile = require('./manageFiles');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const result = await readFile();
  if (result === []) return res.status(200).send('[]');
  res.status(SUCCESS).send(result);
});

app.listen(port, () => console.log(`Server ouvindo na porta ${port}`));
