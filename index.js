const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const lerArquivo = require('./services/lerArquivo');
const { validEmail, validToken, validPass } = require('./Regex');
const { genToken } = require('./services/tokenGenerator');

const app = express();
const SUCCESS = 200;
const PORT = 3000;
const meuArquivo = path.resolve(__dirname, 'crush.json');

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  // se eu fizer o JSON.parse aqui tem problema por causa da assincronicidade - zambelli
  const lendoArquivo = await lerArquivo(meuArquivo);
  /* if (lendoArquivo.lenght === 0) return res.status(200).send([]); */
  const arquivoConvertido = JSON.parse(lendoArquivo);
  /* console.log(typeof lendoArquivo); */ // string
  return res.status(200).send(arquivoConvertido);
  /* console.log(typeof JSON.parse(lendoArquivo)); */ // JavaScriptObjectNotation tranforma
});

app.get('/crush/:id', async (req, res) => {
  const paramId = parseInt(req.params.id, 10);

  const data = await lerArquivo(meuArquivo);
  const dataConvertido = JSON.parse(data);
  const dataId = await dataConvertido.filter((usuario) => usuario.id === paramId)[0];
  if (paramId > dataConvertido.length || paramId < 0) return res.status(404).send({ message: 'Crush não encontrado' });
  /* if (dataId === undefined) return res.status(404).send({ message: 'Crush não encontrado' }); */
  return res.status(200).send(dataId);
});

app.post('/login', (req, res) => {
  const authEmail = validEmail(req.body.email);
  const authPass = validPass(req.body.password);

  if (req.body.email === undefined) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (authEmail === false) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (req.body.password === undefined) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (authPass === false) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = genToken();
  req.headers.authorization = token;
  return res.send({ token });
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
