const apis = require('../services/generateData');

const insertNewCrush = async (req, res) => {
  const data = await apis.getData('crush.json');
  const newID = data[data.length - 1].id + 1;
  const resultNewCrush = { ...req.body, id: newID };
  const newArr = data.concat(resultNewCrush);
  await apis.writingNewCrush('./crush.json', JSON.stringify(newArr));
  return res.status(201).json(resultNewCrush);
};

const editCrush = async (req, res) => {
  const { id } = req.params;
  const data = await apis.getData('crush.json');
  const filter = data.findIndex((usuario) => usuario.id === +id);
  if (filter === -1) return res.status(500).send({ message: 'usuário não encontrado' });
  data[filter] = { ...data[filter], ...req.body };
  await apis.writingNewCrush('./crush.json', JSON.stringify(data));
  return res.status(200).json(data[filter]);
};

const deleteCrush = async (req, res) => {
  const { id } = req.params;
  const data = await apis.getData('crush.json');
  const crushIndex = data.findIndex((usuario) => usuario.id === parseInt(id, 10));
  if (crushIndex === -1) return res.status(500).send({ message: 'usuário não encontrado' });
  data.splice(crushIndex, 1);
  await apis.writingNewCrush('./crush.json', JSON.stringify(data));
  return res.status(200).json({ message: 'Crush deletado com sucesso' });
};

module.exports = { insertNewCrush, editCrush, deleteCrush };
