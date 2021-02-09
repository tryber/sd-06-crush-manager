const { ErrorHandler } = require('../errorHandling/helpers');

const dateAtValidator = (date) => {
  const validatorRegex = /^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/;
  return validatorRegex.test(date);
};

const validateDate = async (req, res, next) => {
  try {
    const { date = 0 } = req.body;
    const { datedAt = 0, rate = 0 } = date;
    console.log(date);
    if (!date || !datedAt || !rate || datedAt.length === 0 || rate.length === 0) {
      throw new ErrorHandler(400, 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
    } else if (!dateAtValidator(datedAt)) {
      throw new ErrorHandler(400, 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    } else if (!(rate >= 1 && rate <= 5)) {
      throw new ErrorHandler(400, 'O campo "rate" deve ser um inteiro de 1 à 5');
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateDate;
