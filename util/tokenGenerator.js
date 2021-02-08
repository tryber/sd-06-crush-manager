function tokenGenerator() {
  const length = 12;

  // inspired by https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
  return Math.round((36 ** (length + 1)) - Math.random() * (36 ** length))
    .toString(36).slice(1);
}

module.exports = tokenGenerator;
