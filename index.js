const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;

app.use(bodyParser.json());

const CrashRoutes = require('./src/routes/crushRoutes');

app.use('/', CrashRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(3000, () => {
  console.log('API ONLINE... Port 3000');
});
