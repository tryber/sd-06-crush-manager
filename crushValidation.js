function crushValidation(name, age, date) {
  const dateRegex = /(\d{2})[/](\d{2})[/](\d{4})/;
  let message = '';
  if (!name) {
    message = 'O campo "name" é obrigatório';
  } else if (name.length < 3) {
    message = 'O "name" deve ter pelo menos 3 caracteres';
  }
  if (!age || !Number.isInteger(age)) {
    message = 'O campo "age" é obrigatório';
  }
  if (age < 18) {
    message = 'O crush deve ser maior de idade';
  }
  if (!date || !date.datedAt || (date.rate === undefined)) {
    message = 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios';
  } else if (!dateRegex.test(date.datedAt)) {
    message = 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"';
  } else if (date.rate !== 1
    && date.rate !== 2
    && date.rate !== 3
    && date.rate !== 4
    && date.rate !== 5) {
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return message;
}

module.exports = crushValidation;
