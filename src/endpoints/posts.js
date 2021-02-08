const randomString = require('randomstring');

const SUCCESS = 200;

module.exports = {
  handleLogin(_req, res) {
    const newToken = randomString.generate(16);
    const generatedToken = { token: newToken };
    res.status(SUCCESS).json(generatedToken);
  },
};
