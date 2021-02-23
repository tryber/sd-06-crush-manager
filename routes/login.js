const login = require('../controllers/login');

const express = require('express');
const router = express.Router();

// req 3
router.post('/', login);

module.exports = router;
