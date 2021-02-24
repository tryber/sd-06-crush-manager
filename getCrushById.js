const { getData } = require('./getData');

const getCrushById = async (req, res) => {
  const response = await getData();
  const { id } = req.params;
  const selectedCrush = JSON.parse(response).find((crush) => crush.id === parseInt(id, 10));
  if (!selectedCrush) {
    return res.status(404).json({ message: 'Crush não encontrado' });
  }
  res.status(200).send(selectedCrush);
};

module.exports = { getCrushById };
