const crypto = require('crypto');

function tokenGenerator() {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

module.exports = tokenGenerator;
