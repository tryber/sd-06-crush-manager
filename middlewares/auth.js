const UNATHORIZED = 401;

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next({ status: UNATHORIZED, message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return next({ status: UNATHORIZED, message: 'Token inválido' });
  }

  next();
};
