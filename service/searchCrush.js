const readFile = require('./read.js');

const searchCrush = async (req, res) => {
  const data = await readFile();
  if (!req.query.q || req.query.q === '') return res.status(200).send(data);
  const queryTerm = req.query.q;
  const query = data.filter((crush) => crush.name.includes(queryTerm));
  res.status(200).send(query);
};

module.exports = searchCrush;
