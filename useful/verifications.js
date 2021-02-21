const checkEmail = (email) => {
  const type = typeof email;
  if (type === 'string') {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return !regexEmail.test(email);
  }
  return null;
};

const characterCount = (stringOrNumber) => {
  const type = typeof stringOrNumber;
  if (type === 'string' || type === 'number') {
    const string = stringOrNumber.toString();
    return string.length;
  }
  return null;
};

const checkDate = (date) => {
  const type = typeof email;
  if (type === 'string') {
    const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    return !regexDate.test(date);
  }
  return null;
};

module.exports = {
  checkEmail,
  characterCount,
  checkDate,
};
