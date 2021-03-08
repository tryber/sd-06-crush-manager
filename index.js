const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const Crush = './crush.json';

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  try {
    const file = JSON.parse(fs.readFileSync(Crush, 'utf8'));
    if (file.length === 0 || !file) {
      const offFlie = [];
      return res.status(200).send(offFlie);
    }
    return res.status(200).send(file);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.listen(3000);
