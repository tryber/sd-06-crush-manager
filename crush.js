const express = require('express');
const fs = require('fs');

const app = express.Router();

const validateToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  next();
};

const readJson = async () => {
  const data = await fs.readFileSync('crush.json');
  const json = await JSON.parse(data);
  console.log(json);
  return json;
};

app.get('/', async (req, res) => {
  const data = await readJson();
  if (data === [] || data === null) return res.status(200).json([]);
  res.status(200).json(data);
});

app.get('/:id', async (req, res) => {
  const data = await readJson();
  const crush = await data.find((el) => el.id === Number(req.params.id));
  if (crush === undefined) return res.status(404).json({ message: 'Crush não encontrado' });
  res.status(200).json(crush);
});

app.get('/search', validateToken, async (req, res) => {
  const data = await readJson();
  if (!req.query.q || req.query.q === '') return res.status(200).json(data);
  const filtered = data.filter((el) => el.name.includes(req.query.q));
  if (filtered === []) return res.status(200).json([]);
  return res.status(200).json(filtered);
});

app.delete('/:id', validateToken, async (req, res) => {
  const data = await readJson();
  const crush = await data.filter((el) => el.id !== Number(req.params.id));
  const json = JSON.stringify(crush);
  fs.writeFileSync('crush.json', json);
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
});

const validateCreateAndUpdate = ({ name, age, date }) => {
  const dateValidate = (dates) => {
    const regex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    return regex.test(String(dates).toLowerCase());
  };
  if (!name || name === '') return { message: 'O campo "name" é obrigatório' };
  if (name < 3) return { message: 'O "name" deve ter pelo menos 2 caracteres' };
  if (!age || age === '') return { message: 'O campo "age" é obrigatório' };
  if (age < 18) return { message: 'O crush deve ser maior de idade' };
  if (!dateValidate(date.datedAt)) return { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' };
  if (date.rate < 1 && date.rate > 5) return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
  if (!date || date === '' || !date.datedAt || !date.rate) return { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' };
  return true;
};

app.post('/', validateToken, async (req, res) => {
  const crush = validateCreateAndUpdate(req.body);
  console.log(req.body);
  if (crush.message) return res.status(400).json(crush);
  const data = await readJson();
  const result = data.concat({ id: data.length + 1, ...req.body })
    .sort((a, b) => a.id - b.id);
  const json = JSON.stringify(result);
  fs.writeFileSync('crush.json', json);
  return res.status(201).json({ id: data.length + 1, ...req.body });
});

app.put('/:id', validateToken, async (req, res) => {
  const crush = validateCreateAndUpdate(req.body);
  if (crush.message) return res.status(400).json(crush);
  const data = await readJson();
  const filter = data.filter((el) => el.id !== Number(req.params.id));
  const result = filter.concat({ id: Number(req.params.id), ...req.body })
    .sort((a, b) => a.id - b.id);
  const json = JSON.stringify(result);
  fs.writeFileSync('crush.json', json);
  return res.status(200).json({ id: Number(req.params.id), ...req.body });
});
/*
{
  "name": "Keanu Reeves",
  "age": 56,
  "date": {
    "datedAt": "22/10/2019",
    "rate": 5
  }
}
*/
module.exports = app;
