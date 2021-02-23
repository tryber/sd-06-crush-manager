const { readFile } = require('../utils/manageFiles');

const searchCrush = async (req, res) => {
  console.log(req.query);
  const { q } = req.query;
  const arrayJson = await readFile();
  const result = arrayJson.filter((el) => el.name.toLowerCase().includes(q.toLowerCase()));
  res
    .status(200)
    .json(result);
};

module.exports = searchCrush;
