// const { response } = require('express');
const express = require('express');
const crushJson = require('./crush.json');
// const token = require('./tokenMUITOSEGURO_E_COMPLEXO.json');

const app = express();
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', (req, res) => {
  if (res.statusCode === 200) {
    res.send(JSON.parse(crushJson));
  }
  return [];
});

// app.get('/crush/:id', (req, res) => {
//   const { ParamID } = req.params;
//   const checkIfTheUserExists = crushJson.some((id) => ParamID === id);
//   if (checkIfTheUserExists) {
//     crushJson.find((id) => id === ParamID);
//   }
//   res.send({
//     message: 'Crush não encontrado',
//   });
// });

// app.post('/crush/:id', (req, res) => {

// });

app.listen(3000, () => {
  console.log('ouvindo a porta 3000');
});
