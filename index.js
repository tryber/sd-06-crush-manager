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

const getCrushes = async () => {
  const crushList = await fs.readFileSync('./crush.json', 'utf-8', (err) => {
    if (err) throw new Error(err);
    console.log('File read');
  });
  return JSON.parse(crushList);
};

app.get('/crush', async (_req, res) => {
  const crushData = await getCrushes();
  res.status(200).send(crushData);
});

app.listen(3000, () => {
  console.log('WORKING UHUL');
});
