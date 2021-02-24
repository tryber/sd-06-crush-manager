const validarPassword = (password) => {
  const regex = /^\d{6,}$/gm;
  return !regex.test(password);
};

module.export = validarPassword;
