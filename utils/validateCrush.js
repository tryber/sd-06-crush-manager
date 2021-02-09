function validateCrushName(name) {
  if (!name) return;
  const nameFormat = /(.*[a-z]){3,}$/gm;
  return nameFormat.test(name);
}

module.exports = {
  validateCrushName,
};
