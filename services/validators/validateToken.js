const { error } = require('../dictionary');

module.exports = (token) => {
  if (!token) throw new Error(error.noToken);
  if (token.length !== 16) throw new Error(error.invalidToken);
};
