const checkToken = (req, res, next) => {
  console.log(req.headers.token);

  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (req.headers.authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });

  return next();
};

module.exports = { checkToken };
