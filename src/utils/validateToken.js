module.exports = function validateToken(token) {
  const TOKEN_LENGTH = 16;

  if (!token || token.length !== TOKEN_LENGTH) return false;

  const validCharsRegex = /^[\w|\d]*$/gi;

  return validCharsRegex.test(token);
};
