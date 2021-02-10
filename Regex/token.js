const validToken = (token) => {
  const validRegex = /^.{16}$/;
  return validRegex.test(token);
};

module.exports = validToken;
