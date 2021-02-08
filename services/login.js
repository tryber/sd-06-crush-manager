function validateEmail(email) {
  if (!email) return;
  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return emailRegex.test(email);
}

function validatePass(password) {
  if (!password) return;
  const six = /^\d{6,}$/gm;
  return six.test(password);
}

module.exports = {
  validateEmail,
  validatePass,
};
