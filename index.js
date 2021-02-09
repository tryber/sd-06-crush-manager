const express = require('express');
const fs = require('fs').promises;

const crushRegistered = 'crush.json';

console.log(crushRegistered);

const app = express();
const SUCCESS = 200;

app.use(express.json());
app.listen(3000, () => console.log('Executando'));

app.get('/crush', async (_req, res) => {
  const read = await fs.readFile(crushRegistered);
  if (read < 1) {
    return res.status(SUCCESS).json([]);
  }
  return res.status(SUCCESS).json(JSON.parse(read));
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
