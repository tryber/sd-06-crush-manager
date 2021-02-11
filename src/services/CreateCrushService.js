const AppError = require('../errors/AppError');

class CreateCrushService {
  constructor(crushModel) {
    this.crushModel = crushModel;
  }

  execute({ name, age, date }) {
    const ageIsNumeric = typeof age === 'number';
    const ageIsAbove18 = age >= 18;

    if (!ageIsNumeric || !ageIsAbove18) {
      throw new AppError('O crush deve ser maior de idade');
    }

    const MIN_NAME_LENGTH = 3;
    const nameIsString = typeof name === 'string';
    const nameHasEnoughChars = name.length >= MIN_NAME_LENGTH;

    if (!nameHasEnoughChars || !nameIsString) {
      throw new AppError('O "name" deve ter pelo menos 3 caracteres');
    }

    const { datedAt, rate } = date;

    const rateIsNumeric = typeof age === 'number';
    const validRates = [1, 2, 3, 4, 5];
    const rateIsWithinDesiredRage = validRates.includes(rate);

    if (!rateIsNumeric || !rateIsWithinDesiredRage) {
      throw new AppError('O campo "rate" deve ser um inteiro de 1 à 5');
    }

    const dateFormatRegex = /^([0-2]\d|3[0-1])\/[0-1]\d\/[1-2](\d){3}$/;
    const dateIsInAcceptedFormat = dateFormatRegex.test(datedAt);

    if (!dateIsInAcceptedFormat) {
      throw new AppError('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
    }

    const validNewCrush = {
      name,
      age,
      date: {
        datedAt,
        rate,
      },
    };

    const newCrush = this.crushModel.create(validNewCrush);

    return newCrush;
  }
}

module.exports = CreateCrushService;
