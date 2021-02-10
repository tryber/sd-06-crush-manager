const { getCrushes } = require('../services');

const searchCrush = async (req, res) => {
  const crushData = await getCrushes();
  const searchText = req.query.q;
  if (!searchText) res.status(200).json(crushData);
  const crushFound = crushData.filter((crush) => crush.name.includes(searchText));
  res.status(200).json(crushFound);
};

module.exports = { searchCrush };
