const { pegandoCrushs } = require('../servicos');

const pegandoTodosOsCrushs = async (_req, res) => {
  const listaDeCrush = await pegandoCrushs();
  res.status(200).json(listaDeCrush);
};

module.exports = { pegandoTodosOsCrushs };
