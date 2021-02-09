const express = require('express');
const bodyParser = require('body-parser');
const middlleware = require('./middleware');
const readCrush = require('./service/crush');
const geradorToken = require('./service/token');

const app = express();
const PORT = 3000;
const SUCCESS = 200;

app.use(bodyParser.json());

// req 1
app.get('/crush', async (_req, res) => {
  const crushs = await readCrush();
  res.status(200).send(crushs);
});

// req 2
app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const procurarId = await readCrush();
  const crushId = procurarId.find((e) => e.id === Number(id));
  if (!crushId) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(crushId);
});

// req 3
app.post('/login', middlleware.validaEmail, middlleware.validaSenha, async (_req, res) => {
  const token = await geradorToken();
  return res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log(`Hashirama protegendo a vila oculta da porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
