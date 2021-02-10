const express = require('express');
const validationToken = require('./middlewares/validationToken');

const router = express.Router();

const SUCCESS = 200;

router.use(validationToken);

router.post('/', (req, res) => {
  res.status(SUCCESS).send(req.body);
});

module.exports = router;
