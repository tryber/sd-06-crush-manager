const crypto = require('crypto');
const { readCrushFile, writeCrushFile, isValidEmail, isValidPassword, isValidDate, isValidRate } = require('../utils');

const getCrushes = async (_req, res) => {
  const allCrushes = await readCrushFile();
  return res.status(200).send(allCrushes);
};

const getCrush = async (req, res) => {
  const allCrushes = await readCrushFile();
  const { id } = req.params;
  const crush = allCrushes.find((each) => each.id === +id);
  if (crush) {
    return res.status(200).send(crush);
  }
  const message = 'Crush não encontrado';
  return res.status(404).send({ message });
};

const getToken = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });

  if (isValidEmail(email)) {
    if (isValidPassword(password)) {
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(200).send({ token });
    }
    return res.status(400).send({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }
  return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const verifyCrushPackage = (req, res, next) => {
  const { name, age, date } = req.body;
  if (name && name.length < 3) return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  if (age < 18) return res.status(400).send({ message: 'O crush deve ser maior de idade' });
  if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });

  if (date) {
    const { datedAt, rate } = date;
    if (!datedAt || (!rate && rate !== 0)) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
    if (!isValidDate(datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    if (!isValidRate(rate)) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else {
    return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  next();
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });

  next();
};

const addCrush = async (req, res) => {
  const { name, age, date } = req.body;

  const allCrushes = await readCrushFile();
  const newId = allCrushes.length + 1;
  allCrushes.push({ name, age, id: newId, date });
  await writeCrushFile(allCrushes);
  return res.status(201).send({ id: newId, name, age, date });
};

const updateCrush = async (req, res) => {
  const id = +req.params.id;
  const { name, age, date } = req.body;

  const allCrushes = await readCrushFile();
  const newCrushesList = allCrushes.map((crush) => {
    if (crush.id === id) {
      return { name, age, id, date };
    }
    return crush;
  });
  console.log(newCrushesList);
  await writeCrushFile(newCrushesList);
  return res.status(200).send({ id, name, age, date });
};

const deleteCrush = async (req, res) => {
  const id = +req.params.id;
  const allCrushes = await readCrushFile();
  const newCrushesList = allCrushes.filter((crush) => crush.id !== id);

  await writeCrushFile(newCrushesList);
  return res.status(200).send({ message: 'Crush deletado com sucesso' });
};

const searchCrush = async (req, res) => {
  const { q } = req.query;

  const allCrushes = await readCrushFile();
  if (!q) return res.status(200).send(allCrushes);

  const newCrushesList = allCrushes.filter((crush) => crush.name.match(new RegExp(q)));
  return res.status(200).json(newCrushesList);
};

module.exports = {
  getCrushes,
  getCrush,
  getToken,
  addCrush,
  updateCrush,
  deleteCrush,
  searchCrush,
  verifyToken,
  verifyCrushPackage,
};
