// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
// Zambelli plantão 10/02 => crypto
const crypto = require('crypto');

const isEmail = (email) => /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
const isADate = (data) => /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(data);
const isSize = (password) => password.toString().length;
const receiveNewToken = () => crypto.randomBytes(8).toString('hex');
module.exports = {
  isEmail,
  isSize,
  isADate,
  receiveNewToken,
};
