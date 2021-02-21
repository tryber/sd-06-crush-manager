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

const getCrush = async () => {
  const result = await fs.readFileSync('./crush.json', 'utf-8', (erro) => {
    if(erro) throw new Error(erro);

    console.log(`algo inesperado aconteceu : ${erro}`);
  })
  return JSON.parse(result);
};

app.get('./crush', async (req, res) => {
  const result = await getCrush();
  res.send(result)
})

app.listen(300, () => {
  console.log('Servidor Online')
})


