const { pegandoCrushs } = require('../servicos');

const pegandoTodosOsCrushs = async (_req, res) => {
  const listaDeCrush = await pegandoCrushs();
  console.log('cheguei aqui');
  res.status(200).json(listaDeCrush);
};

module.exports = { pegandoTodosOsCrushs };
