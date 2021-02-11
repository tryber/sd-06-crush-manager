const { getCrushes } = require('../helpers');

const searchCrush = async (req, res) => {
  const arrayCrushes = await getCrushes();
  const searchText = req.query.q;
  if (!searchText || searchText === '') return res.status(200).json(arrayCrushes);
  const foundCrush = arrayCrushes.filter((crush) => crush.name.includes(searchText));

  res.status(200).json(foundCrush);
};

module.exports = { searchCrush };
