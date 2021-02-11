module.exports = function datingValidation(dating) {
  console.log(dating);
  if (!dating) {
    return false;
  }

  const datingFields = Object.keys(dating);
  console.log(datingFields);
  console.log(datingFields.length);
  const expectedDatingFields = 2;
  if (datingFields.length < expectedDatingFields) {
    return false;
  }

  return true;
};
