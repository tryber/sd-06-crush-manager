const validEmail = (email) => {
  const validRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (email === validRegex) return true;
};

module.export = validEmail;
