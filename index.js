const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
  response.send('ok');
});

app.listen(3000);

// referencia ROCKETSEAT
// YOUTUBE = tantaum de videos(maioria ROCKETSEAT)
// npm install
// npm i express
// npm i body-parser
// npm i nodemon
// npm i fs

// npm i jsonwebtoken
