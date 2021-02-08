const crypto = require('crypto');

const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkPassword = (password) => {
  const passwordOk = password.toString().length >= 6;
  return passwordOk;
};

const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};

module.exports = {
  checkEmail,
  checkPassword,
  createToken,
};
