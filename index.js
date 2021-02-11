const express = require('express');
const { readFile, writeFile } = require('./utils/managerFiles');
const { generateToken } = require('./utils/generateToken');
const { isEmail } = require('./utils/validations/isEmail');
const { isPassword } = require('./utils/validations/isPassword');
const { isToken } = require('./utils/validations/middlewareValidations/isToken');
const { isName } = require('./utils/validations/middlewareValidations/isName');
const { isAge } = require('./utils/validations/middlewareValidations/isAge.js');
const { isDate } = require('./utils/validations/middlewareValidations/isDate.js');

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
  return res.status(SUCCESS).send(crushs);
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
  return res.status(NOTFOUND).json({ message: 'Crush não encontrado' });
});
// end requeriment 2
// requeriment 3 / Crie o endpoint POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const resultToken = generateToken(email);
  const resultEmail = isEmail(email);
  const resultPassword = isPassword(password);

  if (resultEmail[0] !== 200) {
    return res.status(resultEmail[0]).json({
      message: resultEmail[1],
    });
  }
  if (resultPassword[0] !== 200) {
    return res.status(resultPassword[0]).json({
      message: resultPassword[1],
    });
  }

  return res.status(SUCCESS).json({ token: resultToken });
});
// end requeriment 3
// requeriment 4 / Crie o endpoint POST /crush
app.post('/crush', isToken, isName, isAge, isDate, async (req, res) => {
  const crush = req.body;
  const crushsList = await readFile('crush.json');
  const result = { ...crush, id: crushsList.length + 1 };
  crushsList.push(result);
  writeFile('crush.json', JSON.stringify(crushsList, 0, 2));
  return res.status(201).json(result);
});
// end requeriment 4
// requeriment 5 / Crie o endpoint PUT /crush/:id
app.put('/crush/:id', isToken, isName, isAge, isDate, async (req, res) => {
  const crushId = req.params.id;
  const bodyresponse = req.body;
  const bodyresponseAtt = { ...bodyresponse, id: parseInt(crushId) };

  let crushsList = await readFile('crush.json');
  crushsList[crushId - 1] = bodyresponseAtt;

  writeFile('crush.json', JSON.stringify(crushsList, 0, 2));
  
  return res.status(200).json(bodyresponseAtt);
});

app.listen(PORT, () => console.log('funcional na porta 3000'));
