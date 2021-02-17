const BAD_REQUEST = 400;

module.exports = (req, _res, next) => {
  const { name } = req.body;

  if (!name) {
    return next({ status: BAD_REQUEST, message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return next({ status: BAD_REQUEST, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};
