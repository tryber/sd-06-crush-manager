const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const SUCCESS = 200;
const PORT = 3000;

// Routers
const crush = require('./routers/crush');
const login = require('./routers/login');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(bodyParser.json());

app.use('/crush', crush);
app.use('/login', login);

app.use((err, req, res, _next) => {
  console.log(`${req.method} ${req.url} ${res.statusCode}, error: ${err}`);
  return res.json({ message: err.toString() });
});

app.listen(PORT, () => console.log(`Crush Manager server listening on port ${PORT}`));
