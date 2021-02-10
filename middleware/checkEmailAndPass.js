const errorMessages = {
  fieldEmailRequired: {
    message: 'O campo "email" é obrigatório',
  },
  invaliddEmailField: {
    message: 'O "email" deve ter o formato "email@email.com"',
  },
  fieldPasswordRequired: {
    message: 'O campo "password" é obrigatório',
  },
  invalidPasswordField: {
    message: 'A "senha" deve ter pelo menos 6 caracteres',
  },
};

const resultEmailRegex = (email) => email.match(/^(?:[A-Z0-9])+([-_.])?(?:[A-Z0-9])+@(?:[A-Z])+\.(?:com)$/i);
const resultPassRegex = (password) => password.match(/^([A-Z0-9]){6,}$/i);

const checkEmailAndPass = (request, response, next) => {
  const { email, password } = request.body;

  if (email === undefined) {
    return response.status(400).json(errorMessages.fieldEmailRequired);
  }

  if (password === undefined) {
    return response.status(400).json(errorMessages.fieldPasswordRequired);
  }

  if (!resultEmailRegex(email)) {
    return response.status(400).json(errorMessages.invaliddEmailField);
  }

  if (!resultPassRegex(password)) {
    return response.status(400).json(errorMessages.invalidPasswordField);
  }

  return next();
};

module.exports = { checkEmailAndPass };
