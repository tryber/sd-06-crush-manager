const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // why "promises"!?
// const path = require('path');
// const crypto = require('crypto');
// const router = express.Router();

const app = express();
const SUCCESS = 200;
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// FUNCTIONS -------------------------------------------------------

// const getRead = async (fileName) => {
const getRead = async () => {
  const file = await fs.readFile('./crush.json', 'utf-8', (err, data) => {
  // const file = await fs.readFile(path.resolve(__dirname, `${fileName}.json`), '(err, data) => {
    if (err) {
      return err;
    }
    return data;
  });
  return file;
};

// const getWrite = async (fileName, data) => {
//   // await fs.writeFile(path.resolve(__dirname, `${fileName}.json`), data, 'utf-8', (err) => {
//   await fs.writeFile('./crush.json', data, 'utf-8', (err) => {
//     if(err) return console.log(err);
//   });
//   return true;
// };

// const verifyEmail = (email) => {
//   const regex = /^[^@]+@[^@]+\.[^@]+$/;
//   return regex.test(String(email).toLowerCase());
// };

// const verifyPassword = (password) => {
//   if (password.length > 5) {
//     return true;
//   }
//   return false;
// };

// -----------------------------------------------------------------------------

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
  // response.send('running');
});

// - 01 - npm test tests/getAllCrushs.test.js
app.get('/crush', async (request, response) => {
  // const allCrushs = await getRead('crush');
  const allCrushs = await getRead();
  // console.log(allCrushs);
  try {
    response.status(200).json(JSON.parse(allCrushs));
  } catch (err) {
    response.status(200).json([]);
  }
});

// - 02 - npm test tests/getCrushById.test.js
app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  // const { id } = parseInt(request.params, 10);
  // const allCrushs = await getRead('crush');
  const allCrushs = await getRead();
  const crushById = JSON.parse(allCrushs).find((crushId) => crushId.id === parseInt(id, 10));
  // console.log(allCrushs);
  // console.log(crushById);
  // try {
  //   response.status(200).json(crushById);
  //   // response.status(200).json(JSON.stringify(crushById));
  // } catch (err) {
  //   response.status(404).json({ message: 'Crush não encontrado' });
  // }
  if (!crushById) {
    return response.status(404).json({ message: 'Crush não encontrado' });
  }
  return response.status(200).json(crushById);
});

// app.post('/login', async (request, response) => {});

// app.post('/crush', async (request, response) => {});
// app.put('/crush/:id', async (request, response) => {});
// app.delete('/crush/:id', async (request, response) => {});
// app.get('/crush/search?q=searchTerm', async (request, response) => {});

// app.listen(3000);
app.listen(3000, () => console.log('running'));

// referencia ROCKETSEAT
// YOUTUBE = "tantaum" de videos(maioria ROCKETSEAT)
// npm install
// npm i express
// npm i body-parser
// npm i nodemon
// npm i fs

// npm i mongoose
// npm i jsonwebtoken

// https://www.youtube.com/watch?v=BN_8bCfVp88&feature=youtu.be
// https://www.youtube.com/watch?v=BapA-vG9HZI
// https://www.youtube.com/watch?v=j95Lwxvi9JY
// https://www.youtube.com/watch?v=DiXbJL3iWVs&t=663s
// https://stackoverflow.com/questions/31649267/how-to-kill-a-nodejs-process-in-linux
// https://stackoverflow.com/questions/2496710/writing-files-in-node-js
// https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/
// https://www.regexplanet.com/
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
// https://stackoverflow.com/questions/39110801/path-join-vs-path-resolve-with-dirname
// https://www.digitalocean.com/community/tutorials/js-json-parse-stringify-pt
// https://stackoverflow.com/questions/51150956/how-to-fix-this-error-typeerror-err-invalid-callback-callback-must-be-a-funct/51151244
//
