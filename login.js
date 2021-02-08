const checkEmail = (email) => {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regex.test(email);
};

const checkPassword = (password) => {
  if (!password || password.length < 6) return false;
  return true;
};

module.exports = { checkEmail, checkPassword };
