const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(port, () => console.log(`Server ouvindo na porta ${port}`));
