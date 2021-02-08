const crypto = require('crypto');

const tokenGenerator = () => crypto.randomBytes(8).toString('hex');

// const validateEmail = () => {

// }

const login = (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  res.status(200).send('teste');
};

module.exports = login;
