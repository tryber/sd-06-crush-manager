const bodyParser = require('body-parser');
const express = require('express');
const listAllCrushs = require('./requests/listAllCrushs');
const validLogin = require('./requests/validLogin');

const app = express();
const SUCCESS = 200;
const PORT = 3000;
app.use(bodyParser.json());

// -------------- Requirement 1 --------------
app.get('/crush', async (req, res) => {
  const crushs = await listAllCrushs();
  try {
    res.status(200).json(JSON.parse(crushs));
  } catch (err) {
    console.log(err);
    res.status(200).json([]);
  }
});

// --------------- Requirement 2 -------------------
app.get('/crush/:id', async (req, res) => {
  const { id } = req.params;
  const crush = await listAllCrushs();
  const crushID = JSON.parse(crush).find((elem) => elem.id === parseInt(id, 10));

  if (!crushID) res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).json(crushID);
});

// -------------- Requirement 3 -----------------------
app.post('/login', validLogin);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.listen(PORT, () => console.log('Executando'));
