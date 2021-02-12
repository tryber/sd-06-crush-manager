const express = require('express');
const bodyParser = require('body-parser');
const { selectCrushs, login, validations, handleCrush } = require('./middlewares');

const app = express();
const SUCCESS = 200;
const DOOR = 3000;
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', selectCrushs.listAllCrushs);

app.get('/crush/search', validations.validationToken, selectCrushs.listCrushsForTherm);

app.get('/crush/:id', selectCrushs.listCrushForId);

app.post('/login', login.userLogin);

app.post('/crush', validations.validationToken, validations.validAuthentication, handleCrush.insertNewCrush);

app.put('/crush/:id', validations.validationToken, validations.validAuthentication, handleCrush.editCrush);

app.delete('/crush/:id', validations.validationToken, handleCrush.deleteCrush);

app.listen(DOOR, () => console.log(`ON --- PORTA ---${DOOR}!`));
