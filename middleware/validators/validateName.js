const { ErrorHandler } = require('../errorHandling/helpers');

const validateName = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name.length === 0) {
      throw new ErrorHandler(400, 'O campo "name" é obrigatório');
    } else if (name.length < 3) {
      throw new ErrorHandler(400, 'O "name" deve ter pelo menos 3 caracteres');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateName;
