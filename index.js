const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 3000;
const fs = require('fs');
const path = require('path'); 

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});



// requisito 1

const crush = './crush.json';

function readFilePromise (fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });
}

app.get('/crush', async (req, res) => {
  const file = await readFilePromise(path.join(__dirname, '.', 'crush.json'));
  // console.log(file);
  res.status(200).json(JSON.parse(file));
  });

app.listen(port);