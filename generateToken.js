const crypto = require('crypto');

function geraToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = geraToken;
