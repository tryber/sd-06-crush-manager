module.exports = function rateValidation(rate) {
  if (
    !Number.isInteger(rate)
    || (rate < 1 || rate > 5)
  ) {
    return false;
  }

  return true;
};
