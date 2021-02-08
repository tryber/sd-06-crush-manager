const express = require('express');
const path = require('path');
const lerArquivo = require('./lerArquivo');

const app = express();
const SUCCESS = 200;
const PORT = 3000;
const meuArquivo = path.resolve(__dirname, 'crush.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  const lendoArquivo = await lerArquivo(meuArquivo);
  res.status(SUCCESS).send(JSON.parse(lendoArquivo));
});

app.use((err, _req, res, _next) => {
  if (err) {
    return res.status(SUCCESS).json([]);
  }
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
