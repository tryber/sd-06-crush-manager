const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const crypto = require('crypto');

router.use(bodyParser.json());

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      message: 'O campo \'email\' é obrigatório',
    });
  }
  const regexValidateEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regexValidateEmail.test(email)) {
    return res.status(400).json({
      message: 'O \'email\' deve ter o formato \'email@email.com\'',
    });
  }
  if (!password) {
    return res.status(400).json({
      message: 'O campo \'password\' é obrigatório',
    });
  }
  if (password.toString().length < 6) {
    return res.status(400).json({
      message: 'A \'senha\' deve ter pelo menos 6 caracteres',
    });
  }
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;
