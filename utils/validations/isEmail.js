const regexEmailValidate = (email) => {
  const regexValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
  return regexValidator.test(email);
};

const isEmail = (email) => {
  if (!email || email.length === 0) {
    const resultEmail = [400, 'O campo "email" é obrigatório'];
    //return resultEmail;
  } else if (!regexEmailValidate(email)) {
    const resultEmail = [400, 'O "email" deve ter o formato "email@email.com"'];
    //return resultEmail;
  } else {
    const resultEmail = [200, 'Email validado com sucesso'];
    //return resultEmail;
  }
  return resultEmail;
};

module.exports = {
  isEmail,
};
