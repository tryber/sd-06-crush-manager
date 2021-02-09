const express = require('express');
const path = require('path');
const lerArquivo = require('./lerArquivo');

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
  const paramId = parseInt(req.params.id);

  const data = await lerArquivo(meuArquivo);
  const dataConvertido = JSON.parse(data);
  const dataId = dataConvertido.filter((usuario) => usuario.id === paramId);
  return res.status(200).send(dataId);
  /* if (!dataConvertido) return res.status(404).json({ message: 'Crush não encontrado' }); */
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
