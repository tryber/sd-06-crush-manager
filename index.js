const express = require('express');
const fs = require('fs').promises;
const rescue = require('express-rescue');

const app = express();
const SUCCESS = 200;
const fileName = 'crush.json';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', rescue(async (req, res) => {
  const file = await fs.readFile(fileName);
  res.send(file.toString('utf-8'));
}));

app.listen(3000, () => console.log('listening on port 3000'));
