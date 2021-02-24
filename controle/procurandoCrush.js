const { pegandoCrushs } = require('../servicos');

const procurandoCrush = async (req, res) => {
  const crushData = await pegandoCrushs();
  const searchText = req.query.q;
  if (!searchText) res.status(200).json(crushData);
  const crushFound = crushData.filter((crush) => crush.name.includes(searchText));
  res.status(200).json(crushFound);
};

module.exports = { procurandoCrush };
