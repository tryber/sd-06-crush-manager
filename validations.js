const crypto = require('crypto');

const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};
const checkPasswordCont = (password) => {
  const passwordCont = password.toString.length > 6;
  return passwordCont;
};
const createToken = () => {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
};
module.exports = {
  checkEmail,
  checkPasswordCont,
  createToken,
};
