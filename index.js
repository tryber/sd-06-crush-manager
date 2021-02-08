const express = require('express');

const app = express();
const SUCCESS = 200;
const fs = require('fs');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

const fileName = 'crush.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  const readFile = fs.readFileSync(fileName);
  if (!readFile) {
    return res.status(200).send([]);
  }
  return res.status(200).send(JSON.parse(readFile));
});

app.listen(3000, () => console.log('listening port 3000'));
