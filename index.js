const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const bodyParser = require('body-parser');
const { createToken, validateToken, validateLogin, getNextId, validateCrush } = require('./uteis/uteis');

const app = express();
const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const port = 3000;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const fileName = path.join(__dirname, 'crush.json');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

/** pegando dados do arquivo */
const getDados = async () => {
  const data = await readFile(fileName);
  return JSON.parse(data);
};

/** salvando dados */
const setDados = async (crushes) => {
  const formato = JSON.stringify(crushes, null, '\t');
  await writeFile(fileName, formato, 'utf-8');
};

/** requisito 1 */
app.get('/crush', async (req, res) => {
  const crushes = await getDados();
  res.status(SUCCESS).send(crushes);
});

/** requisito 2 */
app.get('/crush/search', async (req, res) => {
  const id = req.query.q;
  const { authorization } = req.headers;
  const validToken = validateToken(authorization);
  if (validToken !== 'OK') {
    return res.status(UNAUTHORIZED).json({ message: validToken });
  }
  const crushes = await getDados();
  const result = crushes.filter((crush) => crush.name.includes(id));
  res.status(SUCCESS).json(result);
});

/** requisito 3 */
app.get('/crush/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushes = await getDados();
  const result = crushes.find((crush) => crush.id === id);

  if (!result) {
    return res.status(NOT_FOUND).json({ message: 'Crush não encontrado' });
  }
  res.status(SUCCESS).json(result);
});

/** requisito 3 */
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const validationLogin = validateLogin(email, password);
  if (validationLogin !== 'OK') {
    return res.status(BAD_REQUEST).json({ message: validationLogin });
  }
  const token = createToken();
  res.status(SUCCESS).json({ token });
});

/** requisito 4 */
app.post('/crush', async (req, res) => {
  const { authorization } = req.headers;
  const { name, age, date } = req.body;

  const token = validateToken(authorization);
  if (token !== 'OK') {
    return res.status(UNAUTHORIZED).json({ message: token });
  }
  const validCrush = validateCrush(name, age, date);
  if (validCrush !== 'OK') {
    return res.status(BAD_REQUEST).json({ message: validCrush });
  }

  const crushes = await getDados();
  const id = getNextId(crushes);
  const newCrush = { name, age, id, date };
  const newArrayCrushes = [...crushes, newCrush];
  setDados(newArrayCrushes);

  res.status(CREATED).json(newCrush);
});

/** requisito 5 */
app.put('/crush/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { authorization } = req.headers;
  const { name, age, date } = req.body;
  const token = validateToken(authorization);
  if (token !== 'OK') {
    return res.status(UNAUTHORIZED).json({ message: token });
  }
  const Crush = validateCrush(name, age, date);
  if (Crush !== 'OK') {
    return res.status(BAD_REQUEST).json({ message: Crush });
  }
  const crushes = await getDados();
  const index = crushes.findIndex((crush) => crush.id === id);
  const result = { name, age, id, date };
  crushes[index] = result;
  setDados(crushes);
  res.status(SUCCESS).json(result);
});

/** requisito 6 */
app.delete('/crush/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { authorization } = req.headers;

  const validToken = validateToken(authorization);
  if (validToken !== 'OK') {
    return res.status(UNAUTHORIZED).json({ message: validToken });
  }

  const crushes = await getDados();
  const crushesDelete = crushes.filter((crush) => crush.id !== id);
  setDados(crushesDelete);

  res.status(SUCCESS).json({ message: 'Crush deletado com sucesso' });
});

app.listen(port, () => console.log(`Serviço rodando na porta ${port}`));
