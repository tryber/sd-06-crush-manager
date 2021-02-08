const BAD_REQUEST = 400;
const emailValidationRegex = /\S+@\S+\.\S+/;

module.exports = {
  dataValidator(req, res, next) {
    const { email, password } = req.body;
    const validatedEmail = emailValidationRegex.test(email);
    if (!email) {
      res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
    } else if (!validatedEmail) {
      res.status(BAD_REQUEST)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    if (!password || password.length === 0) {
      res.status(BAD_REQUEST).json({ message: 'O campo "password" é obrigatório' });
    } else if (password.length < 6) {
      res.status(BAD_REQUEST)
        .json({ message: 'A "senha" deve ter pelo menos 6 caracteres' });
    }
    next();
  },
};
