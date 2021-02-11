function verifyToken(token) {
  if (!token) return 'Token não encontrado';

  if (token.length !== 16) return 'Token inválido';

  return true;
}

module.exports = verifyToken;
