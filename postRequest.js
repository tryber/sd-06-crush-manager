const crypto = require('crypto');

const verifyEmail = (email) => {
  const emailRegex = /^([a-zA-Z0-9_-]+)@mail\.com$/gm;
  return emailRegex.test(email);
};

const verifyPassword = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  async login(request, response) {
    const { email, password } = request.body;

    if (email === '' || !email) return response.status(400).json({ message: 'O campo "email" é obrigatório' });

    if (verifyEmail(email) === false) return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

    if (password === '' || !password) return response.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (verifyPassword(password) === false) return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });

    const token = crypto.randomBytes(8).toString('hex');
    return response.status(200).json({ token });
  },

  // async add(request, response) {

  // },

};
