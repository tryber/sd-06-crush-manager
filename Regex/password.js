const validPass = (password) => {
  const validRegex = /^.{6,12}/;
  return validRegex.test(password);
};

module.exports = validPass;
