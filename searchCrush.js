const crushs = require('./crush.json');

const searchCrushs = (req, res) => {
  const searchInfo = req.query.q;
  const allCrushs = [...crushs];

  if (!searchInfo) return res.status(200).json(allCrushs);
  const result = allCrushs.filter((e) => e.name.includes(searchInfo));

  res.status(200).json(result);
};

module.exports = { searchCrushs };
