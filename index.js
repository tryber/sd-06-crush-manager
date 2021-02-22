const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;
const port = 3000;
app.use(express.json()); // mesma funcionalidade que o bodyParser

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// READ
app.get('/crush', async (_req, res) => {
  try {
    const readFile = await fs.readFile('./crush.json', 'utf-8');
    // console.log(readFile);
    return res.status(200).json(JSON.parse(readFile));
  } catch (error) {
    // console.error(error.message);
    res.status(200).json([]);
  }
});

app.listen(port, () => {
  console.log('Ouvindo na porta:', port);
});
