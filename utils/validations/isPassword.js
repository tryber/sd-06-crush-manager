const regexEmailValidate = (password) => {
  const regexValidator = /\d{6,}/;
  return regexValidator.test(password);
};

const isPassword = (password) => {
  let resultPassword = [];
  if (!password || password.length === 0) {
    resultPassword = [400, 'O campo "password" é obrigatório'];
  } else if (!regexEmailValidate(password)) {
    resultPassword = [400, 'A "senha" deve ter pelo menos 6 caracteres'];
  } else {
    resultPassword = [200, 'A "senha" foi validada com sucesso'];
  }
  return resultPassword;
};

module.exports = {
  isPassword,
};
