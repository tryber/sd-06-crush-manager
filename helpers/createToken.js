const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

const createToken = () => {
  const token = randomToken(16);
  return token;
};

module.exports = { createToken };
