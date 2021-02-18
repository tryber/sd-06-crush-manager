const express = require('express');
const fs = require('fs').promises;
// const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_req, res) => {
  const file = await fs.readFile('./crush.json', 'utf-8');
  if (file === []) return res.status(200).send('[]');
  res.status(200).send(file);
});

app.listen(port, () => console.log(`Server ouvindo na porta ${port}`));
