const express = require('express');
const { readFile } = require('./utils/managerFiles');

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
// requeriment 2
app.get('/crush/:id', async (req, res) => {
  const crushs = await readFile('crush.json');
  const parameter = parseInt(req.params.id, 10);
  const result = crushs.filter((element) => element.id === parameter);
  if (result.length > 0) {
    return res.status(200).send(result[0]);
  }
  const crushnotfound = { menssage: 'Crush não encontrado' };
  return res.status(404).send(crushnotfound);
});
// end requeriment 2

app.listen(PORT, () => console.log('funcional na porta 3000'));
