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

function validateToken(token) {
  if (!token) return;
  const tokenFormat = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){16}$/gm;
  return tokenFormat.test(token);
}

module.exports = {
  validateEmail,
  validatePassword,
  validateToken,
};
