module.exports = function validateEmail(email) {
  const regexPattern = /\S+@\S+\.\S+/;
  return regexPattern.test(email);
};

/*
  Regex from:
  https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
*/
