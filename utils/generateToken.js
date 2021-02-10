// npm install crypto-js // para usar MD5 e gerar um token
const { MD5 } = require('crypto-js');

const generateToken = (email) => MD5(email).toString().substr(8, 16);

module.exports = {
  generateToken,
};
