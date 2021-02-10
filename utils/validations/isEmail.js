const regexEmailValidate = (email) => {
  const regexValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
  return regexValidator.test(email);
};

const isEmail = (email) => {
  let resultEmail = [];
  if (!email || email.length === 0) {
    resultEmail = [400, 'O campo "email" é obrigatório'];
    // return resultEmail;
  } else if (!regexEmailValidate(email)) {
    resultEmail = [400, 'O "email" deve ter o formato "email@email.com"'];
    // return resultEmail;
  } else {
    resultEmail = [200, 'Email validado com sucesso'];
    // return resultEmail;
  }
  return resultEmail;
};

module.exports = {
  isEmail,
};
