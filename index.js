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

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const result = await readFile();
  const filteredID = result.find((crush) => crush.id === parseInt(id, 10));
  if (filteredID === undefined) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(filteredID);
});

app.listen(port, () => console.log(`Server ouvindo na porta ${port}`));
