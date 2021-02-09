const fs = require('fs').promises;

const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

const validateEmail = (email) => {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
};

const validatePassword = (password) => {
  const pattern = /^.{6,}$/;
  return pattern.test(password);
};

module.exports = {
  tokenGenerator,
  validateEmail,
  validatePassword,
};
