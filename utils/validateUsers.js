function validateEmail(email) {
  if (!email) return;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  return emailFormat.test(email);
}

function validatePassword(password) {
  if (!password) return;
  const passwordFormat = /^\d{6,}$/gm;
  return passwordFormat.test(password);
}

module.exports = {
  validateEmail,
  validatePassword,
};
