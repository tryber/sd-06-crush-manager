const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;
app.use(express.json()); // mesma funcionalidade que o bodyParser

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// readFile
const read = async () => {
  const crush = await fs.readFile('./crush.json', 'utf-8');
  // console.log(crush);
  return JSON.parse(crush);
};
// read();
// read rota crush
app.get('/crush', async (_req, res) => {
  try {
    const crushes = await read();
    res.status(200).send(crushes);
  } catch (error) {
    // console.error(error.message);
    res.status(200).json([]);
  }
});

app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crushList = await read();
  // '+' antes de id, funciona como o parseInt
  const paramsId = crushList.filter((crush) => crush.id === +(id));
  if (paramsId.length) {
    return res.status(200).json(paramsId[0]);
  }
  return res.status(404).json({ message: 'Crush não encontrado' });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Executando na ${port}`);
});
