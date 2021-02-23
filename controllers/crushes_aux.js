const validateToken = (token) => {
  const tokenRegex = /^(\d|\w){16}$/gm;
  let message = '';
  let isValid = true;

  if (!token) {
    message = 'Token não encontrado';
    isValid = false;
  }
  if (token && !tokenRegex.test(token)) {
    message = 'Token inválido';
    isValid = false;
  }

  return { message, isValid };
};

const validateName = (name) => {
  let message = '';
  let isValid = true;

  if (!name || name === '') {
    message = 'O campo "name" é obrigatório';
    isValid = false;
  }
  if (name && name.length < 3) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
    isValid = false;
  }

  return { message, isValid };
};

const validateAge = (age) => {
  let message = '';
  let isValid = true;

  if (!age || age === '') {
    message = 'O campo "age" é obrigatório';
    isValid = false;
  }
  if (age && Number.isInteger(age) && age < 18) {
    message = 'O crush deve ser maior de idade';
    isValid = false;
  }

  return { message, isValid };
};

const validateDate = (date) => {
  // https://stackoverflow.com/questions/7388001/javascript-regex-to-validate-date-format
  const dateRegex = /^\d{2}[.-/]\d{2}[.-/]\d{4}$/;
  return dateRegex.test(date);
};

const validateRate = (rate) => Number.isInteger(rate) && rate > 0 && rate <= 5;

module.exports = {
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateToken,
};
