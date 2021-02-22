const crypto = require('crypto');
const { emailValidation, passwordValidation } = require('../utils/validator');

// Função responspavel por validar o login/senha e permitir (ou não), o acesso.
const validateLogin = (req, res) => {
  // Função responsável por gerar o token de 16 digitos.
  const token = crypto.randomBytes(8).toString('hex');
  // Descontrução que capta o email e password do body da requisição.
  const { email, password } = req.body;
  // Validações de email e password segundo os critérios, e os validadores criados em Utils.
  if (!email || email === '') {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  if (emailValidation(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (passwordValidation(password)) {
    return res.status(400).json({
      message: 'A "senha" deve ter pelo menos 6 caracteres',
    });
  }
  // Caso passarem em todas as validações, retorna um res 200 com o token e libera o acesso.
  return res.status(200).json({ token });
};

module.exports = validateLogin;
