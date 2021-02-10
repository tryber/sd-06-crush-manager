const express = require('express');

const {
  getAllCrushs,
  checkEmailAndPass,
  checkAuthentication,
  checkBody,
  writeNewCrush,
  editCrush,
  deleteCrush,
} = require('./middleware');

const CREATED = 201;
const { getToken } = require('./data');

const app = express();
const SUCCESS = 200;

app.use(express.json());
app.use('/login', checkEmailAndPass);

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (_, response) => {
  const crushData = await getAllCrushs();
  if (crushData) {
    return response.status(200).json(crushData);
  }

  response.status(200).json(JSON.parse([]));
});

app.get('/crush/:id', async (request, response) => {
  const { id } = request.params;
  const crushData = await getAllCrushs();
  const crushById = crushData.filter((crush) => crush.id === +id);

  const isValidId = {
    data: crushById[0] || { message: 'Crush não encontrado' },
    status: crushById[0] ? 200 : 404,
  };

  return response.status(isValidId.status).json(isValidId.data);
});

app.post('/login', (_, response) => {
  const token = getToken();
  response.json({ token });
});

app.post('/crush', checkAuthentication, checkBody, async (request, response) => {
  const { name, age, date } = request.body;
  const newCrush = await writeNewCrush({ crushBody: { name, age, date } });
  return response.status(CREATED).json(newCrush);
});

app.put('/crush/:id', checkAuthentication, checkBody, editCrush);
app.delete('/crush/:id', checkAuthentication, deleteCrush);

app.listen(3000, () => { console.log('Server listening...'); });
