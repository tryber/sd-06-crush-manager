const { readCrushs } = require('../utils/manageFiles');

const crushs = '../../crush.json';

const allCrushs = async (_req, res) => {
  const contentCrushs = await readCrushs(crushs);

  console.log(contentCrushs);

  if (contentCrushs.length === 0) {
    return res.status(200).send([]);
  }
  return res.status(200).send(contentCrushs);
};

module.exports = allCrushs;
