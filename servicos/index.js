const gerandoToken = () => {
  crypto.randomBytes(8).toString('hex');
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
  validandoEmail,
  validandoPassword,
  gerandoToken,
};
