const express = require('express');
const bodyParser = require('body-parser');//
const { readFile } = require('./utils/manageFiles');//

const app = express();
const SUCCESS = 200;
const port = 3000;//

app.use(bodyParser.json());//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
//

app.get('/crush', async (_request, response) => {
  // const { crush } = _request.params;
  const crushs = await readFile();
  // response.status(SUCCESS).json(crushs);
  // if (crushs.length > 0) {
  //   response.status(SUCCESS).send(crushs);
  // } else {
  //   response.status(SUCCESS).send([]);
  // }
  response.status(SUCCESS).json(crushs);
});

app.listen(port);
