const createToken = () => {
  const characters = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const stringToken = 'xxxxxxxxxxxxxxxx';
  return stringToken.split('')
    .reduce((st, _c) => st.replace('x', characters.charAt(Math.floor(Math.random() * characters.length))), stringToken);
};

const validateEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript#46181
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validatePassword = (password) => String(password).length >= 6;

module.exports = {
  createToken,
  validateEmail,
  validatePassword,
};
