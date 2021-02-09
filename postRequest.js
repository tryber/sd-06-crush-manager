const crypto = require('crypto');

const verifyEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-z]+$/;
  return emailRegex.test(email);
};

const verifyPassword = (password) => {
  const passwordRegex = /^\d{4,8}$/gm;
  return passwordRegex.test(password);
};

module.exports = {
  async login(request, response, next) {
    const { email, password } = request.body;

    const validEmail = verifyEmail(email);

    const validPassword = verifyPassword(password);

    if (validEmail && validPassword) {
      const token = crypto.randomBytes(8).toString('hex');
      return response.status(200).json({ token });
    }

    if (email === '' || !email) return next({ message: 'O campo "email" é obrigatório' });

    if (!validEmail) return next({ message: 'O "email" deve ter o formato "email@email.com"' });

    if (password === '' || !password) return next({ message: 'O campo "password" é obrigatório' });

    if (password.length < 6) return next({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  },
};
