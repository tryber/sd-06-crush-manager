const tokenGenerator = require('../services/token');
const { readFiles, writingFile } = require('../services/reader');
const { validateEmail, validatePass, validateName,
  validateAge, validateDate, validateRate } = require('../services/validations');

module.exports = {
  async postLogin(req, res, next) {
    const { email, password } = req.body;
    const reqEmail = validateEmail(email);
    const reqPass = validatePass(password);
    if (reqEmail && reqPass) {
      const token = tokenGenerator();
      res.status(200).json({ token });
    }
    if (reqEmail === undefined) return next({ message: 'O campo "email" é obrigatório', statusCode: 400 });
    if (!reqEmail) return next({ message: 'O "email" deve ter o formato "email@email.com"', statusCode: 400 });
    if (reqPass === undefined) return next({ message: 'O campo "password" é obrigatório', statusCode: 400 });
    if (!reqPass) return next({ message: 'A "senha" deve ter pelo menos 6 caracteres', statusCode: 400 });
  },

  async postToken(req, res, next) {
    const { name, age, date } = req.body;
    if (!name) return next({ statusCode: 400, message: 'O campo "name" é obrigatório' });
    if (!age) return next({ statusCode: 400, message: 'O campo "age" é obrigatório' });
    if (!date || !date.datedAt || !date.rate) return next({ statusCode: 400, message: 'O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios' });

    const trueName = validateName(name);
    if (!trueName) return next({ statusCode: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
    const trueAge = validateAge(age);
    if (!trueAge) return next({ statusCode: 400, message: 'O crush deve ser maior de idade' });
    const trueDate = validateDate(date.datedAt);
    if (!trueDate) return next({ statusCode: 400, message: 'O campo "datedAt" deve ter o formato "dd/mm/aaaa"' });
    const trueRate = validateRate(date.rate);
    if (!trueRate) return next({ statusCode: 400, message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

    const file = await readFiles();
    const id = file.length + 1;
    const newCrush = file.concat({ id, name, age, date });
    res.status(201).json({ id, name, age, date });
    return writingFile(newCrush);
  },
};
