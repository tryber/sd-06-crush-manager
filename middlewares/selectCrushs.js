const apis = require('../services/generateData');

const listAllCrushs = async (req, res) => {
  const data = await apis.getData('crush.json');
  res.status(200).send(data);
};

const listCrushForId = async (req, res) => {
  const data = await apis.getData('crush.json');
  const { id } = req.params;
  const findCrushForId = data.filter((crush) => crush.id === +id);
  if (findCrushForId.length > 0) return res.status(200).json(findCrushForId[0]);
  return res.status(404).json({ message: 'Crush não encontrado' });
};

const listCrushsForTherm = async (req, res) => {
  const thermSearch = req.query.q;
  const data = await apis.getData('crush.json');
  const crushSearch = data.filter((crush) => crush.name.includes(thermSearch));
  console.log(thermSearch);
  if (crushSearch.length > 0) return res.status(200).json(crushSearch);
  if (!thermSearch || thermSearch === '') return res.status(200).json(data);
  return res.status(200).send([]);
};

module.exports = {
  listAllCrushs,
  listCrushForId,
  listCrushsForTherm,
};
