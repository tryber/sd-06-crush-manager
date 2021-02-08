const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const crushData = await JSON.parse(fs.readFileSync('./crush.json', 'utf-8'));
  res.status(200).send(crushData);
});

// app.get('/crush/:id', (req, res) => {
//   const reqId = parseInt(req.params.id, 10);
// });

app.listen(3000);
