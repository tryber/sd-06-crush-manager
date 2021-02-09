const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regex.test(email);
};

const characterCount = (stringOrNumber) => {
  const string = stringOrNumber.toString();
  return string.length;
};

module.exports = { checkEmail, characterCount };
