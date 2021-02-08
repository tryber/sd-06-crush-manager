function validateEmail(email) {
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return emailFormat.test(email);
}

function validatePassword(password) {
  const passwordFormat = /^\d{6,}$/gm;
  return passwordFormat.test(password);
}

module.exports = {
  validateEmail,
  validatePassword,
};
