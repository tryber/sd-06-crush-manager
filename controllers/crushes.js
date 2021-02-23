const parsedData = require('../utils/readCrushesData');

const {
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateToken,
} = require('./crushes_aux');

const getCrushes = async (_req, res) => {
  const crushes = await parsedData();
  res.status(200).json(crushes);
};

const getCrush = async (req, res) => {
  const crushes = await parsedData();
  const { id } = req.params;

  const crush = crushes.find((c) => c.id === +id);

  if (crush) {
    return res.status(200).json(crush);
  }

  return res.status(404).json({ message: 'Crush não encontrado' });
};

const createCrush = async (req, res) => {
  const crushes = await parsedData();
  const { name, age, date } = req.body;
  const { authorization: token } = req.headers;

  const vToken = validateToken(token);
  if (!vToken.isValid) return res.status(401).json({ message: vToken.message });

  if (!date || !date.datedAt || !date.rate) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (date.datedAt && !validateDate(date.datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (date.rate && !validateRate(date.rate)) return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

  const vName = validateName(name);
  if (!vName.isValid) return res.status(400).json({ message: vName.message });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age && !validateAge(age)) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  return res.status(201).json({
    id: (crushes.length + 1),
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  });
};

const editCrush = async (req, res) => {
  const crushes = await parsedData();
  const { name, age, date } = req.body;
  const { authorization: token } = req.headers;
  const { id } = req.params;

  const vToken = validateToken(token);
  if (!vToken.isValid) return res.status(401).json({ message: vToken.message });

  // regex aqui pois não consegui lidar com o 0
  const rateFormat = /^[1-5]$/gm;
  if (date === undefined || date.datedAt === undefined || date.rate === undefined) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!rateFormat.test(date.rate)) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (date.datedAt && !validateDate(date.datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const vName = validateName(name);
  if (!vName.isValid) return res.status(400).json({ message: vName.message });

  if (!age || age === '') return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age && !validateAge(age)) return res.status(400).json({ message: 'O crush deve ser maior de idade' });

  let crush = crushes.find((c) => parseInt(c.id, 10) === id);
  crush = { ...req.body, id: parseInt(id, 10) };

  return res.status(200).json(crush);
};

const deleteCrush = async (req, res) => {
  const crushes = await parsedData();
  const { authorization: token } = req.headers;
  const { id } = req.params;

  const vToken = validateToken(token);
  if (!vToken.isValid) return res.status(401).json({ message: vToken.message });

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
  editCrush,
  deleteCrush,
};
