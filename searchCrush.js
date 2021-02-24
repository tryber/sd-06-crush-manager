const { getData } = require('./getData');

const searchCrush = async (req, res) => {
  const data = await getData();
  const newData = JSON.parse(data);
  const searchText = req.query.q;
  if (!searchText) res.status(200).json(newData);
  const crushFound = newData.filter((crush) => crush.name.includes(searchText));
  return res.status(200).json(crushFound);
};

module.exports = { searchCrush };
