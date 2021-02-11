const { readFile, writeFile } = require('../utils/managefile');
const { dateValidation } = require('../utils/validator');

// Requisito 5
const editCrush = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const { name, age, date } = req.body;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 4) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'O crush deve ser maior de idade',
    });
  }
  if (!date || date === '' || !date.datedAt || date.rate === undefined) {
    return res.status(400).json({
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
    });
  }
  if (date.rate > 5 || date.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  if (dateValidation(date.datedAt)) {
    return res.status(400).json({
      message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  const crushes = await readFile('crush');
  const crushesParsed = JSON.parse(crushes);
  const crushToBeEditedId = parseInt(req.params.id, 10);
  const crushesWithoutCrushId = crushesParsed
    .filter((crush) => crush.id !== crushToBeEditedId);
  const crushEdited = ({
    name,
    age,
    id: crushToBeEditedId,
    date,
  });
  crushesWithoutCrushId.push(crushEdited);
  writeFile('crush', JSON.stringify(crushesWithoutCrushId));
  console.log(crushesWithoutCrushId);
  res.status(200).send(crushEdited);
};

module.exports = editCrush;
