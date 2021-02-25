const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const CRUSHES_PATH = './crush.json';
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_, res, _next) => {
  try {
    const crushes = JSON.parse(fs.readFileSync(CRUSHES_PATH, 'utf8'));
    if (!crushes || crushes.length === 0) {
      console.log('no_crushes');
      const noCrushes = [];
      return res.status(200).send(noCrushes);
    }
    return res.status(200).send(crushes);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

app.listen(3000);
