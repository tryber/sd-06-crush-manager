const BAD_REQUEST = 400;

module.exports = (req, _res, next) => {
  const { age } = req.body;

  if (!age) {
    return next({ status: BAD_REQUEST, message: 'O campo "age" é obrigatório' });
  }

  if (age < 18) {
    return next({ status: BAD_REQUEST, message: 'O crush deve ser maior de idade' });
  }

  next();
};
