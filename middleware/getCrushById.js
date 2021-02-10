const crushReader = require('../utils/crushReader');
const { ErrorHandler } = require('./errorHandling/helpers');

const getCrushById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const crushes = await crushReader();
    const queriedCrush = crushes.find((crush) => crush.id === +id);
    if (!queriedCrush) {
      throw new ErrorHandler(404, 'Crush não encontrado');
    }
    res.status(200).send(queriedCrush);
  } catch (error) {
    next(error);
  }
};

module.exports = getCrushById;
