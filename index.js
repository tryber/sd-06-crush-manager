const express = require('express');
const fs = require('fs');
const { gen } = require('n-digit-token');
const fileCrush = require('./crush.json');

const app = express();
const SUCCESS = 200;
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (_req, res) => {
  const crushes = JSON.parse(fs.readFileSync('./crush.json'));
  if (crushes.length > 0) {
    res.status(200).send(crushes);
  } else {
    console.log([]);
    res.status(200).send([]);
  }
});

app.get('/crush/:id', (req, res) => {
  const crushes = JSON.parse(fs.readFileSync('./crush.json'));
  const crush = crushes.find((c) => c.id === parseInt(req.params.id, 10));
  if (!crush) return res.status(404).send({ message: 'Crush não encontrado' });
  res.status(200).send(crush);
});

app.post('/login', (req, res) => {
  const myToken = gen(16);

  // const data = JSON.stringify(req.body);
  // fileCrush.push(data);
  // console.log(fileCrush);
  // // console.log(file_crush);
  // fs.writeFileSync('crush.json', fileCrush);
  console.log(fileCrush);

  res.send({ token: myToken });
});

app.listen(port, () => console.log('Listening on 3000...'));
