const validToken = (token) => {
  const validRegex = /^.{16}/;
  if (token === validRegex) return true;
};

module.exports = validToken;
