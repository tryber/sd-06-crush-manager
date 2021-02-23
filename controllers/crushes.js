const parsedData = require('../utils/readCrushesData');
const editData = require('../utils/editCrushesData');

const {
  validateName,
  validateAge,
  validateDate,
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

  // regex aqui pois não consegui lidar com o 0
  const rateFormat = /^[1-5]$/gm;
  if (date === undefined || date.datedAt === undefined || date.rate === undefined) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!rateFormat.test(date.rate)) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (date.datedAt && !validateDate(date.datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const vName = validateName(name);
  if (!vName.isValid) return res.status(400).json({ message: vName.message });

  const vAge = validateAge(age);
  if (!vAge.isValid) return res.status(400).json({ message: vAge.message });

  const newCrush = {
    id: (crushes.length + 1),
    name,
    age,
    date: {
      datedAt: date.datedAt,
      rate: date.rate,
    },
  };

  editData([...crushes, newCrush]);
  return res.status(201).json(newCrush);
};

const editCrush = async (req, res) => {
  const crushes = await parsedData();
  const { name, age, date } = req.body;
  const { authorization: token } = req.headers;
  const { id } = req.params;

  const vToken = validateToken(token);
  if (!vToken.isValid) return res.status(401).json({ message: vToken.message });

  const rateFormat = /^[1-5]$/gm;
  if (date === undefined || date.datedAt === undefined || date.rate === undefined) return res.status(400).send({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  if (!rateFormat.test(date.rate)) return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  if (date.datedAt && !validateDate(date.datedAt)) return res.status(400).send({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });

  const vName = validateName(name);
  if (!vName.isValid) return res.status(400).json({ message: vName.message });

  const vAge = validateAge(age);
  if (!vAge.isValid) return res.status(400).json({ message: vAge.message });

  let updatedCrush = crushes.find((c) => parseInt(c.id, 10) === id);
  updatedCrush = { ...req.body, id: parseInt(id, 10) };

  const updatedCrushes = crushes.filter((c) => c.id !== parseInt(id, 10));
  editData([...updatedCrushes, updatedCrush]);
  return res.status(200).json(updatedCrush);
};

const deleteCrush = async (req, res) => {
  const crushes = await parsedData();
  const { authorization: token } = req.headers;
  const { id } = req.params;

  const vToken = validateToken(token);
  if (!vToken.isValid) return res.status(401).json({ message: vToken.message });

  const updatedCrushes = crushes.filter((c) => c.id !== +id);
  if (updatedCrushes) {
    editData([...updatedCrushes]);
    return res.status(200).json({ message: 'Crush deletado com sucesso' });
  }

  return res.status(404).json({ message: 'Crush não encontrado' });
};

const searchCrush = async (req, res) => {
  const { authorization: token } = req.headers;
  const { q } = req.query;

  const vToken = validateToken(token);
  if (!vToken.isValid) return res.status(401).json({ message: vToken.message });

  let queryCrushes = [];
  if (q) {
    const crushes = await parsedData();
    crushes.forEach((c) => console.log(c.name));
    queryCrushes = crushes.filter((c) => c.name.includes(q));
  }

  return res.status(200).json(queryCrushes);
};

module.exports = {
  getCrushes,
  getCrush,
  createCrush,
  editCrush,
  deleteCrush,
  searchCrush,
};
