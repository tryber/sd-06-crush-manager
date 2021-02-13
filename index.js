const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const middleware = require('./middlewares');

const SUCCESS = 200;
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.post('/login', middleware.login);
app.post('/crush', middleware.authToken, middleware.searchCrush);
app.get('/crush', middleware.verifyCrushes);
app.get('/crush/:id', middleware.getByIdCrush);
app.put('/crush/:id', middleware.authToken, middleware.putCrush);
app.delete('/crush/:id', middleware.authToken, middleware.delCrush);

app.use((err, req, res, next) => {
  next(err);
  res.status(500).json({ message: 'error' });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
