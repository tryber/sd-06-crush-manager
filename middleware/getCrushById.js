const crushReader = require('../services/crushReader');

const getCrushById = async (req, res) => {
  const { id } = req.params;
  const crushes = await crushReader();
  console.log(crushes);
  res.status(200).send('teste');
};

module.exports = getCrushById;
