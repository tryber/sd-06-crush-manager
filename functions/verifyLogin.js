function checkEmail(email) {
  // regex de email obtido em https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!email || email.length === 0) {
    return 'null';
  }

  if (!emailPattern.test(email)) {
    return 'regex';
  }

  return true;
}

function checkPassword(password) {
  if (!password) {
    return 'null';
  }

  if (password.length < 6) {
    return 'length';
  }

  return true;
}

function createToken() {
  let token = '';

  for (let i = 0; i < 16; i += 1) {
    token = token.concat((Math.floor(Math.random() * 8 + 1)).toString());
  }

  return token;
}

module.exports = { checkEmail, checkPassword, createToken };
