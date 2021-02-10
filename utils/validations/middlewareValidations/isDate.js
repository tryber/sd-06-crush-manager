const regexDateValidator = (date) => {
  const validatorRegex = /^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/;
  return validatorRegex.test(date);
};

const isDate = async (req, res, next) => {
  const { date = 0 } = req.body;
  const { datedAt = '', rate = '' } = date;

  if ((!date || !datedAt || !rate || datedAt.length === 0 || rate.length === 0) && rate !== 0) {
    return res.status(400).json({ message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }
  if (!regexDateValidator(datedAt)) {
    return res.status(400).json({ message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!(rate >= 1 && rate <= 5) || rate <= 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  isDate,
};
