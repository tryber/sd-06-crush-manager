const validateToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.statusCode = 401;
    return next('Token não encontrado');
  }

  if (authToken.length !== 16) {
    res.statusCode = 401;
    return next('Token inválido');
  }
  next();
};

module.exports = validateToken;
