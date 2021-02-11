const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const lerArquivo = require('./services/lerArquivo');
const escreverArquivo = require('./services/escreverArquivo');
const { validEmail, validPass, validToken } = require('./Regex');
const { genToken } = require('./services/tokenGenerator');
const { validDate } = require('./newCrush/date');

const app = express();
const SUCCESS = 200;
const PORT = 3000;
const meuArquivo = path.resolve(__dirname, 'crush.json');

app.use(bodyParse.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.get('/crush', async (req, res) => {
  // se eu fizer o JSON.parse aqui tem problema por causa da assincronicidade - zambelli
  const lendoArquivo = await lerArquivo(meuArquivo);
  /* if (lendoArquivo.lenght === 0) return res.status(200).send([]); */
  const arquivoConvertido = JSON.parse(lendoArquivo);
  /* console.log(typeof lendoArquivo); */ // string
  return res.status(200).send(arquivoConvertido);
  /* console.log(typeof JSON.parse(lendoArquivo)); */ // JavaScriptObjectNotation tranforma
});

app.get('/crush/:id', async (req, res) => {
  const paramId = parseInt(req.params.id, 10);

  const data = await lerArquivo(meuArquivo);
  const dataConvertido = JSON.parse(data);
  const dataId = await dataConvertido.filter((usuario) => usuario.id === paramId)[0];
  if (paramId > dataConvertido.length || paramId < 0) return res.status(404).send({ message: 'Crush não encontrado' });
  /* if (dataId === undefined) return res.status(404).send({ message: 'Crush não encontrado' }); */
  return res.status(200).send(dataId);
});

app.post('/login', (req, res) => {
  const authEmail = validEmail(req.body.email);
  const authPass = validPass(req.body.password);

  if (req.body.email === undefined) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (authEmail === false) return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  if (req.body.password === undefined) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (authPass === false) return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  const token = genToken();
  req.headers.authorization = token;
  return res.send({ token });
});

app.post('/crush', async (req, res) => {
  const novoCrush = req.body;
  const token = req.headers.authorization;
  /* console.log(typeof novoCrush); //objeto */

  const data = await lerArquivo(meuArquivo);
  const dataConvertido = JSON.parse(data);

  const totalCrushes = dataConvertido.concat(
    {
      name: novoCrush.name,
      age: novoCrush.age,
      id: dataConvertido.length + 1,
      date: novoCrush.date,
    },
  );

  const novoCrushJson = await escreverArquivo(meuArquivo, JSON.stringify(totalCrushes));

  const { name, age, date } = novoCrush;
  const { datedAt, rate } = novoCrush.date;
  const realDate = validDate(datedAt);

  if (!token) return res.status(401).send({ message: 'Token não encontrado' });
  if (validToken(token) === false) return res.status(401).send({ message: 'Token inválido' });

  if (!name === true) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age === true) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });

  if (date !== undefined || date.length !== 0) {
    if (!rate === true) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (rate < 1 || rate > 5 || typeof rate === 'string') return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    if (datedAt === undefined) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (realDate === false) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

    if (token) return res.status(201).send(totalCrushes);
  }
  if (token) return res.status(201).send(totalCrushes);
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
