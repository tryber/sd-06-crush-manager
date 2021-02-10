const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;
const port = 3000;
const crushArray = 'crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito -1 obs: '_' p/ quando um parãmetro não é usado
// res com todos os crushs cadastrados ou um array vazio e o status 200.
app.get('/crush', async (_req, res) => {
  const crushes = await fs.readFile(crushArray);
  if (!crushes) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(crushes));
});

app.listen(3000, () => console.log(`Using port: ${port}`));

// Requisito-2 obs: id da url vem formato string, por isso o Number(id)
// res com o crush doo id da rota ou { "message": "Crush não encontrado" } e o status 404
app.get('/crush/:id', async (req, res) => {
  const crushes = await fs.readFile(crushArray);
  const crushesJson = JSON.parse(crushes);
  const { id } = req.params;
  const crush = crushesJson.find((crushJson) => crushJson.id === Number(id));
  if (!crush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(crush);
});
