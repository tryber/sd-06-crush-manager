const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send('Olá mundo');
});

app.get('/crush', (_req, res) => {
  try {
    const data = fs.readFileSync('crush.json', 'utf8');
    res.status(SUCCESS).send(data);
  } catch (error) {
    res.status(SUCCESS).send('Erro ao ler o arquivo');
  }
});

app.listen(port, () => console.log('Example app listening on port port!'));
