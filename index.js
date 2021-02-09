const express = require('express');
const fs = require('fs').promises;

const app = express();
const SUCCESS = 200;
const porta = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

async function getData(arq) {
  const data = await fs.readFile(arq);
  return data;
}

// function readFilePromise(fileName) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileName, (err, content) => {
//       if (err) return reject(err);
//       resolve(content);
//     });
//   });
// }

app.get('/crush', async (_, res) => {
  const data = await getData('crush.json');
  res.status(200).send(data);
});
app.listen(porta, () => console.log('ON 3000!'));
