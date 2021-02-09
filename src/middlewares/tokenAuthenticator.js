const BAD_REQUEST = 401;

module.exports = {
  tokenAuthenticator(req, res, next) {
    const authorization = req.headers;
    const minimumTokenLength = 16;
    if (!authorization) {
      res.status(BAD_REQUEST).json({ message: 'Token não encontrado' });
    } else if (authorization.length !== minimumTokenLength) {
      res.status(BAD_REQUEST).json({ message: 'Token inválido' });
    }
    next();
  },
};
