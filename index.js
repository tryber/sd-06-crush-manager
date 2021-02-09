const express = require('express');
const bodyParser = require('body-parser');
const { auth, logger, error, getCrushs, getCrushById,
  postLogin, postToken, putCrushId, deleteCrushById } = require('./middlewares');

const app = express();
const SUCCESS = 200;
app.use(logger);
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getCrushs);
app.get('/crush/:id', getCrushById);

app.post('/login', postLogin);
app.post('/crush', auth, postToken);

app.put('/crush/:id', auth, putCrushId);
app.delete('/crush/:id', auth, deleteCrushById);

app.use(error);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O PAI TÁ ON ${PORT} VEZES!`);
});
