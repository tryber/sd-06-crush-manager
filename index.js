const express = require('express');

const fs = require('fs').promises;

const app = express();

const SUCCESS = 200;
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1
app.get('/crush', async (_req, res) => {
  const data = await fs.readFile('./crush.json');

  if (data.length < 1) {
    res.status(SUCCESS).send([]);
  }

  res.status(SUCCESS).send(JSON.parse(data));
});
// requisito 2
app.get('/crush/:id', async (req, res) => {
  const data = await fs.readFile('./crush.json');

  const { id } = req.params;

  const dataJSON = JSON.parse(data);

  const result = dataJSON.find((el) => el.id === Number(id));

  if (result === undefined) {
    res.status(404).send({ message: 'Crush não encontrado' });
  }

  res.status(SUCCESS).send(result);
});

app.listen(port, () => console.log('working...'));
