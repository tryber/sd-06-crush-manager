module.exports = function validateDate(date) {
  const pattern = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  return pattern.test(date);
};
