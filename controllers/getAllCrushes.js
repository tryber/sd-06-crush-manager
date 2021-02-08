const { readCrushFile } = require('../services/utils');

module.exports = async (req, res) => {
  const data = JSON.parse(await readCrushFile());
  res.status(200).json(data);
};
