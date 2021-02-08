const crypto = require('crypto');

function generateToken() {
  const token = crypto.randomBytes(8).toString('hex');

  return token;
}

function validateEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  return !regex.test(email);
}
module.exports = { generateToken, validateEmail };
