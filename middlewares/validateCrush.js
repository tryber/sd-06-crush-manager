const { validateAge, validateName, validateDatePattern } = require('../helpers/validateAddCrush');

const validateCrush = (req, res, next) => {
  const { name, age, date } = req.body;
  console.log(name);

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (validateName(name)) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (validateAge(age)) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  if (!date || !date.datedAt || (!date.rate && date.rate !== 0)) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (!validateDatePattern(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  return next();
};

module.exports = { validateCrush };
