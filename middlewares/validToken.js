const Unauthorized = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(Unauthorized).send({ message: 'Token não encontrado' });
  if (authorization && authorization.length !== 16) return res.status(Unauthorized).send({ message: 'Token inválido' });
  next();
};
