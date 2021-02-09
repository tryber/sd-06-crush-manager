const express = require('express');
const fs = require('fs');

const dataCrush = 'crush.json';

const SUCCESS = 200;
const PORT = 3000;

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Challenge 1

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

const data = readFile(dataCrush);

app.get('/crush', (_req, res) => {
  if (data.length === 0) return res.status(200).json([]);

  data
    .then((content) => {
      res.status(200).json(JSON.parse(content));
    })
    .catch((err) => {
      res.status(500).json({ Error: err.message });
    });
});

// Challenge 2

app.get('/crush/:id', (req, res) => {
  const { id } = req.params;

  data
    .then((content) => {
      const arrayData = JSON.parse(content);
      const crushId = arrayData.find((obj) => obj.id === parseInt(id, 10));
      if (!crushId) return res.status(404).json({ message: 'Crush não encontrado' });
      res.status(200).json(crushId);
    })
    .catch((err) => {
      res.status(500).json({ Error: err.message });
    });
});

app.listen(PORT, () => console.log(`Rodando servidor na porta: ${PORT}`));
