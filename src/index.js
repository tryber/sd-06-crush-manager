const express = require('express');

const app = express();
const port = 3000;
const SUCCESS = 200;

const bodyParser = require('body-parser');
const { getAllCrushs } = require('./controllers/getAllCrushs');
const { getCrushById } = require('./controllers/getCrushById');
const { validateLogin } = require('./controllers/validateLogin');
const { addNewCrush } = require('./controllers/addNewCrush');
const { editCrushInformation } = require('./controllers/editCrushInformation');
const { deleteCrush } = require('./controllers/deleteCrush');
const { searchCrushByTerm } = require('./controllers/searchCrushByTerm');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', getAllCrushs);
app.get('/crush/:id', getCrushById);
app.post('/login', validateLogin);
app.post('/crush', addNewCrush);
app.put('/crush/:id', editCrushInformation);
app.delete('/crush/:id', deleteCrush);
app.get('/crush/search?q=searchTerm', searchCrushByTerm);

app.listen(port, console.log('Servidor funcionando'));
