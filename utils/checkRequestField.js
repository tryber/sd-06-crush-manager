module.exports = function checkRequestField(obj, fieldName) {
  const hasField = fieldName in obj;

  if (hasField) {
    if (typeof obj[fieldName] === 'number') {
      return obj[fieldName] !== undefined;
    }
    return obj[fieldName].length > 0;
  }
  return false;
};
