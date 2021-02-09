const crypto = require('crypto');

module.exports = function () {
  return new Promise((fulfill, reject) => {
    crypto.randomBytes(8, (error, buf) => {
      if (error) {
        reject(error);
      } else {
        const token = buf.toString('hex');
        fulfill(token);
      }
    });
  });
};
