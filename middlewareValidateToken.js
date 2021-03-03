const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.length === 16) return next();
  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  return res.status(401).json({ message: 'Token inválido' });
};

module.exports = validateToken;
