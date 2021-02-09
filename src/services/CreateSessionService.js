const AppError = require('../errors/AppError');
const generateToken = require('../utils/generateToken.js');

class CreateSessionService {
  execute({ email, password }) {
    this.num += 1;

    const emailRegex = /\w+@(\w+\.)+\w+$/i;
    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) {
      throw new AppError('O "email" deve ter o formato "email@email.com"');
    }

    const MIN_PW_LENGTH = 6;
    const passwordIsValid = password.length >= MIN_PW_LENGTH;

    if (!passwordIsValid) {
      throw new AppError('A "senha" deve ter pelo menos 6 caracteres');
    }

    const token = generateToken();

    return token;
  }
}

module.exports = CreateSessionService;
