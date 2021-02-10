const { getCrushes } = require('../services');

const getCrushById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const crushData = await getCrushes();
  const foundCrush = crushData.find((crush) => crush.id === id);
  if (!foundCrush) res.status(404).json({ message: 'Crush não encontrado' });

  res.status(200).json(foundCrush);
};

module.exports = { getCrushById };
