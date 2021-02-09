const express = require('express');

const router = express.Router();

const allCrushs = require('../controllers/CrashAll');
const searchCrushById = require('../controllers/CrashById');
const crashToken = require('../controllers/CrashToken');
const addNewCrush = require('../controllers/CrashAdd');

router.get('/crush', allCrushs);
router.get('/crush/:id', searchCrushById);
router.post('/login', crashToken);
router.post('/crush', addNewCrush);

module.exports = router;
