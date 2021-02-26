const Model = require('../models/searchCrushModel');

const searchCrush = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await Model.searchCrush(q);
    if (!result) throw Error;

    res
      .status(200)
      .json(result);
    Model.teste();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Algo deu ruim' });
  }
};

module.exports = searchCrush;
