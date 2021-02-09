const validateToken = async (req, res, next) => {
  const TOKEN_STATUS = 401;

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(TOKEN_STATUS).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(TOKEN_STATUS).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateToken;
