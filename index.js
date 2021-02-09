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
  // se eu fizer o JSON.parse aqui tem problema porque tem assincronicidade - zambs
  const lendoArquivo = await lerArquivo(meuArquivo);
  /* if (lendoArquivo.lenght === 0) return res.status(200).send([]); */
  const arquivoConvertido = JSON.parse(lendoArquivo);
  /* console.log(typeof lendoArquivo); */ // string
  return res.status(200).send(arquivoConvertido);
  /* console.log(typeof JSON.parse(lendoArquivo)); */ // JavaScriptObjectNotation tranforma
});

/* app.use((err, _req, res, _next) => {
  if (err) {
    return res.status(SUCCESS).json([]);
  }
}); */

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
