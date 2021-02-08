const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

// Routers
const crush = require('./routers/crush');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use('/crush', crush);

app.use((err, req, res, _next) => {
  console.log(`${req.method} ${req.url} ${req.statusCode}, error: ${err}`);
  res.status(req.statusCode).json({ message: err });
});

app.listen(PORT, () => console.log(`Crush Manager server listening on port ${PORT}`));
