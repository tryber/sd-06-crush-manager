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

app.get('/crush/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    // const retrievedCrush = JSON.parse(fs.readFileSync(CRUSHES_PATH, 'utf8')).
    //  find((crush) => crush.id === Number(id));
    const crushes = (fs.readFileSync(CRUSHES_PATH, 'utf8'));
    const crushesObj = JSON.parse(crushes);
    const retrievedCrush = crushesObj.find((crush) => crush.id === Number(id));
    if (!retrievedCrush) {
      return res.status(404).send({ message: 'Crush não encontrado' });
    }
    return res.status(200).send(retrievedCrush);
  } catch (err) {
    return next(res.status(500).send(err));
  }
});

app.get('/crush', (_req, res, next) => {
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
    return next(res.status(500).send(err));
  }
});

app.listen(3000);
