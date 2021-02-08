const tokenGenerator = require('../services/token');
const { validateEmail, validatePass } = require('../services/login');

module.exports = {
  async postLogin(req, res, next) {
    const { email, password } = req.body;
    const reqEmail = validateEmail(email);
    const reqPass = validatePass(password);
    if (reqEmail && reqPass) {
      const token = tokenGenerator();
      res.status(200).json({ token });
    }
    if (reqEmail === undefined) return next({ message: 'O campo \'email\' é obrigatório', statusCode: 400 });
    if (!reqEmail) return next({ message: 'O \'email\' deve ter o formato \'email@email.com\'', statusCode: 400 });
    if (reqPass === undefined) return next({ message: 'O campo \'password\' é obrigatório', statusCode: 400 });
    if (!reqPass) return next({ message: 'O \'password\' ter pelo menos 6 caracteres', statusCode: 400 });
  },
};
