/* ( ͡° ͜ʖ ͡°) */

const errorMessages = {
  fieldNameRequired: { message: 'O campo "name" é obrigatório' },
  invalidNameField: { message: 'O "name" deve ter pelo menos 3 caracteres' },
  fieldAgeRequired: { message: 'O campo "age" é obrigatório' },
  invalidAgeField: { message: 'O crush deve ser maior de idade' },
  invalidRateField: { message: 'O campo "rate" deve ser um inteiro de 1 à 5' },
  fieldDateRequired: { message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' },
  invalidDateField: { message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' },
};

const BAD_REQUEST = 400;

const resultNameRegex = (name) => name.match(/^\s*([A-Z]\s*){3,}$/i);
const resultRateRegex = (rate) => rate.match(/^([1-5])$/);
const resultDateRegex = (date) => date.match(/^(0?[1-9]|[12]\d|3[01])([/.-])(0?[1-9]|1[0-2])\2((19\d{2}|20\d{2})|(\d{2}))$/);

const checkBody = async (request, response, next) => {
  const { name, age, date } = request.body;

  if (!name) {
    return response.status(BAD_REQUEST).json(errorMessages.fieldNameRequired);
  }
  if (!resultNameRegex(name)) {
    return response.status(BAD_REQUEST).json(errorMessages.invalidNameField);
  }

  if (!age) {
    return response.status(BAD_REQUEST).json(errorMessages.fieldAgeRequired);
  }
  if (age < 18) {
    return response.status(BAD_REQUEST).json(errorMessages.invalidAgeField);
  }

  if (!date || !date.datedAt || date.rate === undefined) {
    return response.status(BAD_REQUEST).json(errorMessages.fieldDateRequired);
  }
  if (!resultRateRegex(date.rate.toString())) {
    return response.status(BAD_REQUEST).json(errorMessages.invalidRateField);
  }
  if (!resultDateRegex(date.datedAt)) {
    return response.status(BAD_REQUEST).json(errorMessages.invalidDateField);
  }

  next();
};

module.exports = { checkBody };
