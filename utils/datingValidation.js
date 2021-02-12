module.exports = function datingValidation(dating) {
  if (!dating) {
    return false;
  }

  const datingFields = Object.keys(dating);
  const expectedDatingFields = 2;
  if (datingFields.length < expectedDatingFields) {
    return false;
  }

  return true;
};
