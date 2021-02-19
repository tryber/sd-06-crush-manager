const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
// const router = express.Router();

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const getRead = async (fileName) => {
  const file = await fs.readFile(path.resolve(__dirname, `${fileName}.json`), 'utf-8');
  return file;
};

// const getWrite = async (fileName, data) => {
//   await fs.writeFile(path.resolve(__dirname, `${fileName}.json`), data, 'utf-8', (err) => {
//     if(err) return console.log(err, 'getWrite fail');
//   });
//   return true;
// };

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
  // response.send('running');
});

// - 01 - npm test tests/getAllCrushs.test.js
app.get('/crush', async (request, response) => {
  const allCrushs = await getRead('crush');
  // console.log(allCrushs);
  try {
    response.status(200).json(JSON.parse(allCrushs));
  } catch (err) {
    response.status(200).json([]);
  }
});

// - 02 - npm test tests/getCrushById.test.js
app.get('/crush/:id', async (request, response) => {
  const { id } = parseInt(request.params.id, 10);
  const allCrushs = await getRead('crush');
  const crushById = JSON.parse(allCrushs).find((crushId) => crushId.id === id);
  // console.log(allCrushs);
  // console.log(crushById);
  try {
    response.status(200).json(crushById);
  } catch (err) {
    response.status(404).json({ message: 'Crush não encontrado' });
  }
});

// app.post('/login', async (request, response) => {});
// app.post('/crush', async (request, response) => {});
// app.put('/crush/:id', async (request, response) => {});
// app.delete('/crush/:id', async (request, response) => {});
// app.get('/crush/search?q=searchTerm', async (request, response) => {});

// app.listen(3000);
app.listen(3000, () => console.log('running'));

// referencia ROCKETSEAT
// YOUTUBE = tantaum de videos(maioria ROCKETSEAT)
// npm install
// npm i express
// npm i body-parser
// npm i nodemon
// npm i fs

// npm i jsonwebtoken
