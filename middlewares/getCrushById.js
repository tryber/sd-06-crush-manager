const { getCrushes } = require('../helpers');

const getCrushById = async (req, res) => {
  const reqId = parseInt(req.params.id, 10);
  const arrayCrushes = await getCrushes();

  const foundCrush = arrayCrushes.find((crush) => crush.id === reqId);

  if (!foundCrush) res.status(404).json({ message: 'Crush não encontrado' });

  res.status(200).json(foundCrush);
};

module.exports = { getCrushById };
