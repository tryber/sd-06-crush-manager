const crushes = require('../crush.json');
const {
  validateName,
  validateAge,
  validateDate,
  validateRate,
} = require('./crushes_aux');

const getCrushes = (_req, res) => res.status(200).json(crushes);

const getCrush = (req, res) => {
  const { id } = req.params;

  const crush = crushes.find((c) => c.id === +id);

  if (crush) {
    return res.status(200).json(crush);
  }

  return res.status(404).json({ message: 'Crush não encontrado' });
};

const createCrush = (req, res) => {
  const { name, age, date } = req.body;
  const { authorization: token } = req.headers;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token && token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  if (!date || !date.datedAt || !date.rate) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.datedAt && !validateDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate && !validateRate(date.rate)) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name && !validateName(name)) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age && !validateAge(age)) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  return res.status(201).json({
    id: crushes.length + 1,
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  });
};

const updateCrush = (req, res) => {
  const { name, age, date } = req.body;
  const { authorization: token } = req.headers;
  const { id } = req.params;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token && token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  if (!date || !date.datedAt || !date.rate) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.datedAt && !validateDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate && !validateRate(date.rate)) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  if (!name || name === '') return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name && !validateName(name)) return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age && !validateAge(age)) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  const crush = crushes.find((c) => c.id === +id);
  crush.id = Number(id);
  crush.name = name;
  crush.age = age;
  crush.date.datedAt = date.datedAt;
  crush.date.rate = date.rate;

  if (crush) return res.status(200).json(crush);

  return res.status(404).json({ message: 'Crush não encontrado' });
};

const deleteCrush = (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = req.params;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token && token.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  const crush = crushes.filter((c) => c.id !== +id);
  if (crush) {
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  }

  return res.status(404).json({ message: 'Crush não encontrado' });
};

module.exports = {
  getCrushes,
  getCrush,
  createCrush,
  updateCrush,
  deleteCrush,
};
