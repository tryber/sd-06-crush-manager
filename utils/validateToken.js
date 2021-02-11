module.exports = function validateToken(token) {
  return token.length === 16;
};
