const auth = { token: '7mqaVRXJSp886CGr' };

const validateLogin = async (request, response) => {
  const { email, password } = request.body;
  const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailFormat.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return response.status(400).json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
  }

  response.status(200).json(auth);
};

module.exports = {
  validateLogin,
};
