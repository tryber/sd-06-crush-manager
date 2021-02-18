const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const result = await fs.readFile('./crush.json', 'utf-8');
  if (result === []) return res.status(200).send('[]');
  res.status(200).send(result);
});

app.listen(PORT, () => console.log('Server rolando na porta %s', PORT));
