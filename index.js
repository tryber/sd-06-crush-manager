const express = require('express');
const fs = require('fs');

const app = express();
const SUCCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 1 =====================================

app.get('/crush', (_req, res) => {
  const content = fs.readFileSync('./crush.json', 'utf-8');
  if (!content) {
    return res.status(200).json([]);
  }
  return res.status(200).json(JSON.parse(content));
});

// ================================================

// Requisito 2 =====================================

app.get('/crush/:id', (req, res) => {
  const content = fs.readFileSync('./crush.json', 'utf-8');
  const { id } = req.params;
  const filteredCrushes = JSON.parse(content).find((crush) => crush.id === Number(id));
  if (!filteredCrushes) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  return res.status(200).json(filteredCrushes);
});

// ================================================

app.listen(3000, () => console.log('ouvindo na porta 3000'));
