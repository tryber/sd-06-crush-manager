function validateDate(date) {
  if (!date) {
    return {
      message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios',
      valid: false };
  }
  return {
    valid: true,
  };
}

module.exports = validateDate;
