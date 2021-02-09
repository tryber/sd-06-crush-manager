const express = require('express');
const path = require('path');
const lerArquivo = require('./lerArquivo');
/* const { validEmail, validToken} = require('./Regex/index'); */

const app = express();
const SUCCESS = 200;
const PORT = 3000;
const meuArquivo = path.resolve(__dirname, 'crush.json');

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

/* app.post('/login', (req, res) => {

}); */

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
