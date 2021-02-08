const { getData } = require('./getData');

const getCrushById = async (req, res) => {
  const response = await getData();
  const { id } = req.params;
  const selectedCrush = JSON.parse(response).find((crush) => crush.id === parseInt(id, 1));
  if (!selectedCrush) {
    throw new Error('crush not found');
  }
  res.send(selectedCrush);
};

module.exports = getCrushById;
