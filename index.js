const express = require('express');
const { readFile, writeFile } = require('./utils/managerFiles');

const app = express();
const SUCCESS = 200;

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requeriment 1
app.get('/crush', async (req, res) => {
  const crushs = await readFile('crush.json');
  res.status(200).send(crushs);
});
// end requeriment 1

app.listen(PORT, () => console.log('funcional na porta 3000'));
