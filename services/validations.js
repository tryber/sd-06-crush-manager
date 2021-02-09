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

function validateToken(token) {
  if (!token) return;
  const tokenRegex = /^.{16}$/;
  return tokenRegex.test(token);
}

function validateName(name) {
  if (!name) return;
  const nameFormat = /^.{3,}$/;
  return nameFormat.test(name);
}

function validateAge(age) {
  if (!age || typeof age !== 'number') return;
  const minAge = 18;
  return age >= minAge;
}

function validateDate(date) {
  if (!date) return false;
  const formatDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/;
  return formatDate.test(date);
}

function validateRate(rate) {
  if (!rate) return false;
  const rateRegex = /^[1-5]$/;
  return rateRegex.test(rate);
}

module.exports = {
  validateEmail,
  validatePass,
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
};
