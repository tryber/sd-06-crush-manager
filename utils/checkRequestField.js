module.exports = function checkRequestField(obj, fieldName) {
  console.log(`Objeto: ${obj}`);
  console.log(`Campo buscado: ${fieldName}`);
  const hasField = fieldName in obj;

  if (hasField) {
    return obj[fieldName].length > 0;
  }
  return false;
};
