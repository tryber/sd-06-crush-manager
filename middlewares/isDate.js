const BAD_REQUEST = 400;

module.exports = (req, _res, next) => {
  const { date } = req.body;

  const isValidDated = (date) ? /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(date.datedAt) : true;

  if (!date || !date.datedAt || date.rate === undefined) {
    return next({ status: BAD_REQUEST, message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });
  }

  if (!isValidDated) {
    return next({ status: BAD_REQUEST, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!Number.isInteger(date.rate) || date.rate < 1 || date.rate > 5) {
    return next({ status: BAD_REQUEST, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};
