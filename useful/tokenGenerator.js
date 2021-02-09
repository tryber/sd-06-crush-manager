const crypto = require('crypto');

const tokenGenerator = (numberOfCharacters) => {
  const numberForRandomBytes = numberOfCharacters / 2;
  const token = crypto.randomBytes(numberForRandomBytes).toString('hex');
  return token;
};

module.exports = tokenGenerator;
