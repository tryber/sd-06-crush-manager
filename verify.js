const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkPassword = (password) => {
  if (!password || password.length < 6) return false;
  return true;
};

const checkName = (nome) => {
  if (nome.length < 3) return false;
  return true;
};

const checkAge = (age) => {
  if (age < 18) return false;
  return true;
};

const checkDate = (data) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  return regex.test(data);
};

module.exports = {
  checkEmail,
  checkPassword,
  checkName,
  checkAge,
  checkDate,
};
