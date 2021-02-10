const { ErrorHandler } = require('../errorHandling/helpers');

const validateAge = async (req, res, next) => {
  try {
    const { age } = req.body;
    if (!age || age.length === 0) {
      throw new ErrorHandler(400, 'O campo "age" é obrigatório');
    } else if (age < 18) {
      throw new ErrorHandler(400, 'O crush deve ser maior de idade');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAge;
