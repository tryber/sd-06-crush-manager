const express = require('express');

const app = express();
const SUCCESS = 200;
const port = 3000;

const { getCrush, getCrushId } = require('./getRequest');
const { handleLogin, addCrush, handleLoginValidation, handleCrushValidation } = require('./postRequest');
const { editCrush } = require('./putRequest');
const { deleteCrush } = require('./deleteRequest');
const { handleError } = require('./utils/middlewareError');

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});
app.get('/crush', getCrush);
app.get('/crush/:id', getCrushId);

app.post('/login', handleLogin);
app.post('/crush', handleLoginValidation, handleCrushValidation, addCrush);

app.put('/crush/:id', handleLoginValidation, handleCrushValidation, editCrush);

app.delete('/crush/:id', handleLoginValidation, deleteCrush);

app.use(handleError);

app.listen(port, () => console.log(`Executando na porta ${port}`));
