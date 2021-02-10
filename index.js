const express = require('express');
const { readFile } = require('./utils/managerFiles');
const { generateToken } = require('./utils/generateToken');
const { isEmail } = require('./utils/validations/isEmail');
const { isPassword } = require('./utils/validations/isPassword');

const app = express();
// preciso da linha 6 para o express ler variaveis do tipo json

app.use(express.json());
const SUCCESS = 200;
const NOTFOUND = 404;
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// requeriment 1 / Crie o endpoint GET /crush
app.get('/crush', async (req, res) => {
  const crushs = await readFile('crush.json');
  res.status(SUCCESS).send(crushs);
});
// end requeriment 1
// requeriment 2 / Crie o endpoint GET /crush/:id
app.get('/crush/:id', async (req, res) => {
  const crushs = await readFile('crush.json');
  const parameter = parseInt(req.params.id, 10);
  const result = crushs.filter((element) => element.id === parameter);
  if (result.length > 0) {
    return res.status(SUCCESS).send(result[0]);
  }
  // duvida (?);
  // const crushnotfound = { menssage: 'Crush não encontrado' };
  return res.status(NOTFOUND).json({ message: 'Crush não encontrado' });
});
// end requeriment 2
// requeriment 3 / Crie o endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const resultToken = generateToken(email);
  const resultEmail = isEmail(email);
  const resultPassword = isPassword(password);

  if (resultEmail[0] !== 200) res.status(resultEmail[0]).send(resultEmail[1]);
  if (resultPassword[0] !== 200) res.status(resultPassword[0]).send(resultPassword[1]);

  res.status(SUCESS).json({ token: resultToken });
});
// end requeriment 3

app.listen(PORT, () => console.log('funcional na porta 3000'));
