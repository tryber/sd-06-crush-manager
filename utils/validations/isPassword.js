const regexEmailValidate = (password) => {
  const regexValidator = /\d{6,}/;
  return regexValidator.test(password);
};

const isPassword = (password) => {
  if (!password || password.length === 0) {
    const resultPassword = [400, 'O campo "password" é obrigatório'];
    return resultPassword;
  } else if (!regexEmailValidate(password)) {
    const resultPassword = [400, 'A "senha" deve ter pelo menos 6 caracteres'];
    return resultPassword;
  }
  const resultPassword = [200, 'A "senha" foi validada com sucesso'];
  return resultPassword;
};

module.exports = {
  isPassword,
};
