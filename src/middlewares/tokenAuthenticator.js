const UNAUTHORIZED = 401;

module.exports = {
  tokenAuthenticator(req, res, next) {
    const authorization = req.headers;
    const minimumTokenLength = 16;
    if (!authorization) {
      res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
    } else if (authorization.length !== minimumTokenLength) {
      res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
    }
    next();
  },
};
