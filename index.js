const express = require('express');

const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
const SUCCESS = 200;
// body-parser para leituras de arquivos json (vindos, por exemplo, do body)
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// app.use(); garante que todas as requisições passarão por ele
app.use(routes);

// "A função app.listen() do Express inicia um socket UNIX e escuta as conexões
// em um caminho fornecido." [https://pt.stackoverflow.com/questions/228944/qual-a-fun%C3%A7%C3%A3o-do-app-listen-no-express]
const PORT = 3000;
app.listen(PORT, () => console.log(`Roz, sweet dreams are made... on PORT ${PORT} <3`));
