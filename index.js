const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const SUCCESS = 200;
const PORT = 3000;
const { verifyCrushes } = require('./middlewares/verifyCrushes');
const { getByIdCrush } = require('./middlewares/getByIdCrush');
const { login } = require('./middlewares/login');

app.use(bodyParser.json());

app.get('/crush', verifyCrushes);
app.get('/crush/:id', getByIdCrush);
app.post('/login', login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use((err, req, res, next) => {
  next(err);
  res.status(500).json({ message: 'error' });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
