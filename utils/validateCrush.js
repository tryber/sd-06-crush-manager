function validateCrushName(name) {
  if (!name) return;
  const nameFormat = /^\d{6,}$/gm;
  return nameFormat.test(name);
}

function validateCrushAge(age) {
  if (!age || typeof age !== 'number') return;
  const minAge = 18;
  return age > minAge;
}

function validateCrushDate(date) {
  if (!date) return false;
}

module.exports = {
  validateCrushName,
  validateCrushAge,
  validateCrushDate,
};
