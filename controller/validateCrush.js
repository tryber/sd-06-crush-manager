const checkDate = (date) => {
  const pattern = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return pattern.test(date);
};

const validateCrush = (req, res, next) => {
  const { name, age, date } = req.body;

  if (!req.headers.token) return res.status(401).json({ message: 'Token não encontrado' });
  if (req.headers.token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  if (!date || !date.datedAt || !date.rate) return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!checkDate(date.datedAt)) return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  if (date.rate < 1 || date.rate > 5) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  return next();
};

module.exports = { validateCrush };
