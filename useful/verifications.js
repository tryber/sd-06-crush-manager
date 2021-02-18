const checkEmail = (email) => {
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return !regexEmail.test(email);
};

const characterCount = (stringOrNumber) => {
  const string = stringOrNumber.toString();
  return string.length;
};

const checkDate = (date) => {
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  return !regexDate.test(date);
};

module.exports = {
  checkEmail,
  characterCount,
  checkDate,
};
