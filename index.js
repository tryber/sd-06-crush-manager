const express = require('express');
const fs = require('fs');

const port = 3000;

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  fs.readFile('./crush.json', 'utf8', (err, data) => {
    if (err) {
      console.error(`Não foi possível ler o arquivo. Erro: ${err}`);
    }
    res.status(SUCCESS).send(JSON.parse(data));
  });
});

app.listen(port, () => console.log(`Aplicação rodando na porta ${port}!`));
