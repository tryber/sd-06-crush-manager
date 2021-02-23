const fs = require('fs');

const pegandoCrushs = async () => {
  const listaDeCrush = await fs.readFileSync('./crush.json', 'utf8', (err) => {
    if (err) throw new Error(err);
  });
  return JSON.parse(listaDeCrush);
};

const validandoEmail = (email) => {
  const validacao = /\S+@\S+\.\S+/;
  return validacao.test(email);
};

const validandoPassword = (password) => {
  const validacao = /^.{6,}$/;
  return validacao.test(password);
};

module.exports = {
  pegandoCrushs,
  validandoEmail,
  validandoPassword,
};
