const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

const getCrushs = async () => {
  const crushs = await fs.readFileSync('./crush.json', 'utf8', (err) => {
    if (err) throw new Error(err);
    console.log(`algo inesperado aconteceu ${err}`);
    process.exit(1);
  });
  return JSON.parse(crushs);
};

app.use(bodyParser.json());

app.get('/crush', async (req, res) => {
  const response = await getCrushs();
  res.send(response);
});

app.listen(3000, () => {
  console.log('trabalhando');
});

app.listen('3000');
