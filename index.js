const express = require('express');
const bodyParser = require('body-parser');
const middlleware = require('./middleware');
const readCrush = require('./service/crush');
const deletaCrush = require('./service/deleta');
const geradorToken = require('./service/token');
const writeCrush = require('./service/writeCrush');
const updateCrush = require('./service/update');

const app = express();
const PORT = 3000;
const SUCCESS = 200;

app.use(bodyParser.json());

app.post('/login', middlleware.validaEmail, middlleware.validaSenha, async (_req, res) => {
  const token = await geradorToken();
  return res.status(200).json({ token });
});

app.get('/crush', async (_req, res) => {
  const crushs = await readCrush();
  res.status(200).send(crushs);
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crushs = await readCrush();
  const crushId = crushs.find((e) => e.id === Number(id));
  if (!crushId) {
    return res.status(404).send({ message: 'Crush não encontrado' });
  }
  res.status(200).send(crushId);
});

app.post(
  '/crush',
  middlleware.validaToken,
  middlleware.validaNome,
  middlleware.validaIdade,
  middlleware.validaData,
  async (req, res) => {
    const { name, age, date } = req.body;
    const todosCrushs = await readCrush();
    const id = todosCrushs.length + 1;

    const novoCrush = { id, name, age, date };
    writeCrush([...todosCrushs, novoCrush]);

    return res.status(201).json(novoCrush);
  },
);

app.delete('/crush/:id', middlleware.validaToken, async (req, res) => {
  const { id } = req.params;
  const deletar = await deletaCrush(id);

  await writeCrush(deletar);

  res.status(200).json({ message: 'Crush deletado com sucesso' });
});

app.put(
  '/crush/:id',
  middlleware.validaToken,
  middlleware.validaNome,
  middlleware.validaIdade,
  middlleware.validaData,
  async (req, res) => {
    const { id } = req.params;
    const id2 = parseInt(id, 10);
    const { name, age, date } = req.body;
    await updateCrush(name, age, id2, date);

    res.status(200).json({ name, age, id: id2, date });
  },
);

app.listen(PORT, () => {
  console.log(`Hashirama protegendo a vila oculta da porta ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
