const { pegandoTodosOsCrushs } = require('./pegandoTodosOsCrushs');

const pegandoCrushId = async (_req, res) => {
  const id = parseInt(_req.params.id, 10);
  const crushArr = await pegandoTodosOsCrushs();
  const crushEncontrado = crushArr.find((crush) => crush.id === id);
  if (!crushEncontrado) res.status(404).json({ message: 'Crush não encontrado' });

  res.status(200).send(crushEncontrado);
};

module.exports = { pegandoCrushId };
